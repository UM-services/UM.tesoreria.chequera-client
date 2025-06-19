// src/typings.d.ts

// Declaraciones para las interfaces de respuesta de Google Identity Services
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

// Declaraciones para las funciones globales de Google y nuestra callback
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: GoogleCredentialResponse) => void; }) => void;
          renderButton: (element: HTMLElement | null, options: any) => void;
          prompt: () => void;
        }
      }
    };
    handleCredentialResponse: (response: GoogleCredentialResponse) => void;
  }
}

export {}; // <--- AÑADE ESTA LÍNEA AL FINAL