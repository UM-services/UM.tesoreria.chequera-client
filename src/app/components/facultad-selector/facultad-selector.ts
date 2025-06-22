import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FacultadService } from '../../services/facultad.service';
import { BackendService } from '../../services/backend.service';
import { UsuarioChequeraFacultad, ChequeraStatusResponse } from '../../models/usuario.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-facultad-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './facultad-selector.html',
  styleUrl: './facultad-selector.scss'
})
export class FacultadSelector implements OnInit, OnDestroy {
  public authService = inject(AuthService);
  private router = inject(Router);
  private facultadService = inject(FacultadService);
  private backendService = inject(BackendService);
  
  facultades = signal<UsuarioChequeraFacultad[]>([]);
  selectedFacultad = signal<UsuarioChequeraFacultad | null>(null);
  documento = signal<string>('');
  isLoading = signal<boolean>(false);
  isLoadingChequera = signal<boolean>(false);
  hasError = signal<boolean>(false);
  errorMessage = signal<string>('');
  chequeraData = signal<ChequeraStatusResponse | null>(null);
  showChequeraData = signal<boolean>(false);
  canRetryFacultades = signal<boolean>(false);

  private logoutSubscription: Subscription | undefined;

  ngOnInit(): void {
    console.log('FacultadSelector.ngOnInit - Componente inicializado');
    console.log('FacultadSelector.ngOnInit - Usuario actual:', this.authService.user());
    this.loadFacultades();

    this.logoutSubscription = this.authService.logout$.subscribe(() => {
      this.resetState();
    });
  }

  ngOnDestroy(): void {
    this.logoutSubscription?.unsubscribe();
  }

  loadFacultades(): void {
    console.log('FacultadSelector.loadFacultades - Iniciando carga de facultades');
    this.isLoading.set(true);
    this.hasError.set(false);
    this.canRetryFacultades.set(true);
    
    this.authService.getUserFacultades().subscribe({
      next: (facultades) => {
        console.log('FacultadSelector.loadFacultades - Facultades recibidas:', facultades);
        this.facultades.set(facultades);
        if (facultades.length > 0) {
          this.selectedFacultad.set(facultades[0]);
        }
        console.log('Facultades cargadas:', facultades);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('FacultadSelector.loadFacultades - Error:', error);
        this.hasError.set(true);
        this.errorMessage.set('Error al cargar las facultades. Por favor, inténtalo de nuevo.');
        this.isLoading.set(false);
      },
      complete: () => {
        console.log('FacultadSelector.loadFacultades - Completado');
        this.isLoading.set(false);
      }
    });
  }

  onFacultadChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const facultadId = parseInt(select.value);
    const facultad = this.facultades().find(f => f.facultadId === facultadId);
    this.selectedFacultad.set(facultad || null);
    
    if (facultad) {
      console.log('Facultad seleccionada:', facultad);
      this.facultadService.setSelectedFacultad(facultad);
      // Limpiar datos anteriores cuando cambia la facultad
      this.chequeraData.set(null);
      this.showChequeraData.set(false);
      this.documento.set('');
    }
  }

  onDocumentoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.documento.set(input.value);
  }

  consultarChequera(): void {
    const documentoValue = this.documento();
    const facultad = this.selectedFacultad();
    
    if (!documentoValue || !facultad) {
      this.hasError.set(true);
      this.errorMessage.set('Por favor, ingresa un número de documento y selecciona una facultad.');
      return;
    }

    const documentoNum = parseInt(documentoValue);
    if (isNaN(documentoNum)) {
      this.hasError.set(true);
      this.errorMessage.set('Por favor, ingresa un número de documento válido.');
      return;
    }

    this.isLoadingChequera.set(true);
    this.hasError.set(false);
    this.canRetryFacultades.set(false);
    this.showChequeraData.set(false);

    console.log('Consultando chequera para documento:', documentoNum, 'facultad:', facultad.facultadId);

    this.backendService.getChequeraStatus(documentoNum, facultad.facultadId).subscribe({
      next: (data) => {
        console.log('Chequera data recibida:', data);
        this.chequeraData.set(data);
        this.showChequeraData.set(true);
      },
      error: (error) => {
        console.error('Error al consultar chequera:', error);
        this.hasError.set(true);
        this.errorMessage.set('Error al consultar la chequera. Verifica el número de documento e inténtalo de nuevo.');
        this.isLoadingChequera.set(false);
      },
      complete: () => {
        this.isLoadingChequera.set(false);
      }
    });
  }

  resetChequeraError(): void {
    this.hasError.set(false);
    this.errorMessage.set('');
    this.documento.set('');
    this.chequeraData.set(null);
    this.showChequeraData.set(false);
    this.isLoadingChequera.set(false);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }

  getStatusClass(pagado: number): string {
    return pagado === 1 ? 'pagado' : 'pendiente';
  }

  getStatusText(pagado: number): string {
    return pagado === 1 ? 'Pagado' : 'Pendiente';
  }

  trackBySerieId(index: number, serie: any): number {
    return serie.chequeraSerieId;
  }

  trackByCuotaId(index: number, cuota: any): number {
    return cuota.chequeraCuotaId;
  }

  logout(): void {
    this.authService.logout();
  }

  getContainerClasses(): string {
    let classes = ['facultad-selector-container'];
    if (this.isLoading()) {
      classes.push('loading');
    }
    if (this.hasError()) {
      classes.push('error');
    }
    return classes.join(' ');
  }

  private resetState(): void {
    this.selectedFacultad.set(null);
    this.documento.set('');
    this.chequeraData.set(null);
    this.showChequeraData.set(false);
    this.hasError.set(false);
    this.errorMessage.set('');
    this.isLoadingChequera.set(false);
  }
} 