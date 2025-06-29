import { Component, OnInit, AfterViewInit, OnDestroy, inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { getAppConfig } from '../../config/app.config';

// Mantén estas interfaces aquí temporalmente para evitar TS2304
interface GoogleCredentialResponse {
  credential?: string; // El token JWT
  clientId?: string;
  select_by?: string;
}

interface DecodedToken {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  hd?: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

// ELIMINA EL BLOQUE 'declare global' de AQUÍ, si lo tienes.
// Solo debe estar en typings.d.ts

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit, AfterViewInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  private elementRef = inject(ElementRef);
  
  hasError: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;
  googleClientId: string = getAppConfig().googleClientId;

  constructor() {
    console.log('Login component constructor - Config loaded:', getAppConfig());
  }

  ngOnInit(): void {
    // Debug: verificar que el client_id se esté cargando
    console.log('Google Client ID cargado:', environment.googleClientId);
    console.log('Environment completo:', environment);
    
    // Asegurarse de que la función global sea accesible para Google
    window.handleCredentialResponse = this.handleCredentialResponse.bind(this);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit - Verificando Google API...');
    console.log('window.google disponible:', !!window.google);
    console.log('window.google.accounts disponible:', !!(window.google && window.google.accounts));
    console.log('window.google.accounts.id disponible:', !!(window.google && window.google.accounts && window.google.accounts.id));
    
    // Re-inicializar el botón de Google si es necesario
    if (window.google && window.google.accounts && window.google.accounts.id) {
      const clientId = getAppConfig().googleClientId;
      console.log('Inicializando Google Sign-In con client_id:', clientId);
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: this.handleCredentialResponse.bind(this)
      });
      window.google.accounts.id.renderButton(
        this.elementRef.nativeElement.querySelector('.g_id_signin'),
        {
          type: 'standard',
          size: 'large',
          theme: 'outline',
          text: 'sign_in_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          ux_mode: 'popup'
        }
      );
      console.log('Google Sign-In inicializado correctamente');
    } else {
      console.error('Google API no está disponible');
    }
  }

  ngOnDestroy(): void {
    // Limpiar el contenido de los divs de Google para forzar el re-render
    const onloadDiv = this.elementRef.nativeElement.querySelector('#g_id_onload');
    const signinDiv = this.elementRef.nativeElement.querySelector('.g_id_signin');
    if (onloadDiv) onloadDiv.innerHTML = '';
    if (signinDiv) signinDiv.innerHTML = '';
  }

  getContainerClasses(): string {
    let classes = ['login-container'];
    if (this.isLoading) {
      classes.push('loading');
    }
    return classes.join(' ');
  }

  onCreateAccount(): void {
    // Aquí puedes implementar la navegación a la página de creación de cuenta
    console.log('Navegar a la página de creación de cuenta');
  }

  handleCredentialResponse(response: GoogleCredentialResponse): void {
    this.isLoading = true;
    this.hasError = false;
    
    console.log("Encoded JWT ID token: " + response.credential);
    
    if (!response.credential) {
      this.handleError('No se recibió el token de autenticación');
      return;
    }

    try {
      // Decodificar el token JWT
      const base64Url = response.credential.split('.')[1];
      if (!base64Url) {
        throw new Error('Formato de token inválido');
      }
      
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      const decodedToken = JSON.parse(jsonPayload) as DecodedToken;
      console.log('Usuario autenticado con Google:', decodedToken);
      
      // Verificar que el email esté verificado por Google
      if (!decodedToken.email_verified) {
        this.handleError('El email de Google no está verificado. Por favor, verifica tu cuenta de Google.');
        return;
      }
      
      // Verificar la cuenta en el backend y obtener información del usuario
      this.authService.verifyAccountWithBackend(decodedToken.email).subscribe({
        next: (backendUser) => {
          if (backendUser) {
            // Crear objeto User con la información de Google y del backend
            const user: User = {
              id: decodedToken.sub,
              name: decodedToken.name,
              email: decodedToken.email,
              picture: decodedToken.picture,
              given_name: decodedToken.given_name,
              family_name: decodedToken.family_name,
              backendUserId: backendUser.userId
            };
            
            this.authService.setUser(user);
            console.log('Usuario autenticado exitosamente en ambos sistemas');
            console.log('Información del backend:', backendUser);
            
            // Navegar al selector de facultad
            this.router.navigate(['/facultad-selector']);
          } else {
            this.handleError('Tu cuenta de Google no está autorizada para acceder a este sistema. Contacta al administrador.');
          }
        },
        error: (error) => {
          console.error('Error al verificar cuenta en el backend:', error);
          this.handleError('Error al verificar la autorización. Por favor, inténtalo de nuevo.');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
      
    } catch (error) {
      console.error('Error al procesar la respuesta de Google:', error);
      this.handleError('Error al procesar la autenticación. Por favor, inténtalo de nuevo.');
      this.isLoading = false;
    }
  }

  private handleError(message: string): void {
    this.hasError = true;
    this.errorMessage = message;
    this.isLoading = false;
  }
}