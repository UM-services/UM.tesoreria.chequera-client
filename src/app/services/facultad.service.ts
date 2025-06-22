import { Injectable, signal } from '@angular/core';
import { UsuarioChequeraFacultad } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {
  private selectedFacultadSignal = signal<UsuarioChequeraFacultad | null>(null);
  public selectedFacultad = this.selectedFacultadSignal.asReadonly();

  setSelectedFacultad(facultad: UsuarioChequeraFacultad): void {
    this.selectedFacultadSignal.set(facultad);
    // Opcionalmente, guardar en localStorage para persistencia
    localStorage.setItem('selectedFacultad', JSON.stringify(facultad));
  }

  getSelectedFacultad(): UsuarioChequeraFacultad | null {
    return this.selectedFacultad();
  }

  clearSelectedFacultad(): void {
    this.selectedFacultadSignal.set(null);
    localStorage.removeItem('selectedFacultad');
  }

  loadSelectedFacultadFromStorage(): void {
    const facultadStr = localStorage.getItem('selectedFacultad');
    if (facultadStr) {
      try {
        const facultad = JSON.parse(facultadStr) as UsuarioChequeraFacultad;
        this.selectedFacultadSignal.set(facultad);
      } catch (error) {
        console.error('Error loading selected facultad from storage:', error);
        localStorage.removeItem('selectedFacultad');
      }
    }
  }
} 