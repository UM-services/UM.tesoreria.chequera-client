import { Component, signal, inject, effect } from '@angular/core';
import { Login } from './components/login/login'; // La importación de tu componente Login
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Login,
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

  // Clave para forzar el remount del login
  protected loginKey = signal(0);

  constructor() {
    // Efecto para reiniciar el login cuando el usuario hace logout
    effect(() => {
      if (!this.user()) {
        // Si el usuario es null, incrementar la clave para forzar el remount
        this.loginKey.update(k => k + 1);
      }
    });
  }
}