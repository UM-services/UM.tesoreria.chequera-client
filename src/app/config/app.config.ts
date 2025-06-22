import { environment } from '../../environments/environment';

export interface AppConfig {
  googleClientId: string;
  backendUrl: string;
  production: boolean;
}

export const appConfig: AppConfig = {
  googleClientId: environment.googleClientId,
  backendUrl: environment.backendUrl,
  production: environment.production
};

// Función para obtener la configuración
export function getAppConfig(): AppConfig {
  return appConfig;
} 