import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FacultadService } from '../../services/facultad.service';
import { UsuarioChequeraFacultad } from '../../models/usuario.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  public authService = inject(AuthService);
  private facultadService = inject(FacultadService);
  private router = inject(Router);
  
  // Señales para el selector de facultad
  facultades = signal<UsuarioChequeraFacultad[]>([]);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);
  errorMessage = signal<string>('');
  
  // Señal para la facultad seleccionada
  selectedFacultad = this.facultadService.selectedFacultad;

  ngOnInit(): void {
    // Si ya hay una facultad en el servicio, no es necesario cargarla de nuevo
    if (!this.facultadService.selectedFacultad()) {
      this.loadFacultades();
    }
  }

  loadFacultades(): void {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.authService.getUserFacultades().subscribe({
      next: (facultades) => {
        this.facultades.set(facultades);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar facultades:', error);
        this.hasError.set(true);
        this.errorMessage.set('Error al cargar las facultades. Por favor, inténtalo de nuevo.');
        this.isLoading.set(false);
      }
    });
  }

  onFacultadChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const facultadId = parseInt(select.value);
    const facultad = this.facultades().find(f => f.facultadId === facultadId);
    
    if (facultad) {
      this.facultadService.setSelectedFacultad(facultad);
    }
  }
  
  changeFacultad(): void {
    this.facultadService.clearSelectedFacultad();
    this.loadFacultades();
  }
} 