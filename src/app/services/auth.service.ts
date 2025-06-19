import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSignal = signal<User | null>(null);
  public user = this.userSignal.asReadonly();

  constructor() {
    // Verificar si hay un usuario guardado en localStorage al inicializar
    this.loadUserFromStorage();
  }

  setUser(user: User): void {
    this.userSignal.set(user);
    // Guardar en localStorage
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    this.userSignal.set(null);
    // Limpiar localStorage
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return this.user() !== null;
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