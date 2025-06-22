import { Component, signal, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private authService = inject(AuthService);
  
  protected readonly title = signal('chequera-client');
  protected readonly user = this.authService.user;

  constructor() {
    // Efecto para manejar cambios en el estado de autenticación
    effect(() => {
      const currentUser = this.user();
      console.log('Estado de autenticación cambiado:', currentUser ? 'Autenticado' : 'No autenticado');
    });
  }
}