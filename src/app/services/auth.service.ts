import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from './backend.service';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UsuarioChequeraFacultad, Usuario } from '../models/usuario.interface';

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
  backendUserId?: number; // ID del usuario en el backend
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSignal = signal<User | null>(null);
  public user = this.userSignal.asReadonly();

  private logoutSource = new Subject<void>();
  logout$ = this.logoutSource.asObservable();

  private router = inject(Router);

  constructor(private backendService: BackendService) {
    // Verificar si hay un usuario guardado en localStorage al inicializar
    this.loadUserFromStorage();
  }

  setUser(user: User): void {
    console.log('setUser - Guardando usuario:', user);
    console.log('setUser - backendUserId:', user.backendUserId);
    this.userSignal.set(user);
    // Guardar en localStorage
    localStorage.setItem('user', JSON.stringify(user));
    console.log('setUser - Usuario guardado en localStorage');
  }

  logout(): void {
    this.userSignal.set(null);
    // Limpiar localStorage
    localStorage.removeItem('user');
    this.logoutSource.next();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.user() !== null;
  }

  /**
   * Verifica si una cuenta de Google es válida tanto en Google como en el backend
   * @param email - El email de Google a verificar
   * @returns Observable<Usuario | null> - Información del usuario del backend si es válida, null en caso contrario
   */
  verifyAccountWithBackend(email: string): Observable<Usuario | null> {
    return this.backendService.verifyAccount(email).pipe(
      map(backendUser => {
        if (!backendUser) {
          console.warn(`Cuenta ${email} no autorizada en el backend`);
        }
        return backendUser;
      }),
      catchError(error => {
        console.error('Error al verificar cuenta en el backend:', error);
        // En caso de error, consideramos que la cuenta no es válida por seguridad
        return of(null);
      })
    );
  }

  /**
   * Obtiene las facultades del usuario autenticado
   * @returns Observable<UsuarioChequeraFacultad[]> - Lista de facultades del usuario
   */
  getUserFacultades(): Observable<UsuarioChequeraFacultad[]> {
    const currentUser = this.user();
    console.log('getUserFacultades - currentUser:', currentUser);
    console.log('getUserFacultades - backendUserId:', currentUser?.backendUserId);
    
    if (!currentUser || !currentUser.backendUserId) {
      console.warn('getUserFacultades - No hay usuario o backendUserId:', {
        hasUser: !!currentUser,
        backendUserId: currentUser?.backendUserId
      });
      return of([]);
    }
    
    console.log('getUserFacultades - Llamando al backend con userId:', currentUser.backendUserId);
    return this.backendService.getUserFacultades(currentUser.backendUserId);
  }

  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        this.userSignal.set(user);
      } catch (error) {
        console.error('Error loading user from storage:', error);
        localStorage.removeItem('user');
      }
    }
  }
} 