import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private authService = inject(AuthService);
  
  // Exponer el usuario como signal para reactividad
  protected user = this.authService.user;

  logout(): void {
    this.authService.logout();
  }
} 