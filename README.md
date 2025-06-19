# Chequera Client

[![Angular](https://img.shields.io/badge/Angular-20.1.0-next.0-red.svg?style=for-the-badge&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-Stylesheet-orange.svg?style=for-the-badge&logo=sass)](https://sass-lang.com/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8.0-purple.svg?style=for-the-badge&logo=reactivex)](https://rxjs.dev/)
[![Google Identity](https://img.shields.io/badge/Google%20Identity-Sign--In-brightgreen.svg?style=for-the-badge&logo=google)](https://developers.google.com/identity)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

Una aplicación Angular 20 moderna con un componente de login con Google Sign-In mejorado estéticamente y funcionalidades avanzadas de autenticación.

## 🚀 Características Principales

### 🎨 Diseño Moderno y Responsivo
- **Gradiente de fondo atractivo**: Fondo con gradiente púrpura-azul moderno
- **Tarjeta centrada**: Diseño de tarjeta con sombras y bordes redondeados
- **Tipografía Google Sans**: Fuente oficial de Google para mejor consistencia
- **Animaciones suaves**: Transiciones y animaciones CSS para mejor UX
- **Responsive design**: Adaptable a dispositivos móviles y tablets
- **Modo oscuro**: Soporte automático para preferencias del sistema

### 🔧 Funcionalidades Avanzadas
- **Autenticación con Google**: Integración completa con Google Identity Services
- **Manejo de estados**: Loading, error y éxito con feedback visual
- **Persistencia de datos**: Almacenamiento local del usuario autenticado
- **Gestión de sesiones**: Servicio de autenticación con signals de Angular
- **Accesibilidad**: Focus states, reduced motion y mejor contraste
- **Angular 20 Control Flow**: Uso del nuevo `@if` en lugar de `*ngIf`

### 🎯 Componentes Visuales
- **Logo animado**: SVG con animación de pulso
- **Indicador de carga**: Spinner personalizado durante la autenticación
- **Mensajes de error**: Alertas visuales con iconos
- **Botón de Google Sign-In**: Integración nativa con Google Identity
- **Footer informativo**: Términos de servicio y política de privacidad

## 🛠️ Stack Tecnológico

### Frontend Framework
- **Angular 20.1.0-next.0**: Framework principal con nuevo control flow
- **TypeScript 5.8.2**: Tipado estático mejorado con configuración estricta
- **SCSS**: Preprocesador CSS con variables y mixins
- **RxJS 7.8.0**: Programación reactiva

### Autenticación
- **Google Identity Services**: Autenticación OAuth 2.0 con Google
- **JWT Token Handling**: Decodificación y validación de tokens
- **Local Storage**: Persistencia de sesión del usuario

### Herramientas de Desarrollo
- **Angular CLI 20.1.0-next.2**: Herramientas de desarrollo
- **Karma + Jasmine**: Framework de testing
- **ES2022**: Target de compilación moderno

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── footer/
│   │   │   ├── footer.html
│   │   │   ├── footer.scss
│   │   │   └── footer.ts
│   │   ├── header/
│   │   │   ├── header.html
│   │   │   ├── header.scss
│   │   │   └── header.ts
│   │   └── login/
│   │       ├── login.html      # Template con nuevo control flow
│   │       ├── login.scss      # Estilos del componente
│   │       └── login.ts        # Lógica del componente
│   ├── services/
│   │   └── auth.service.ts     # Servicio de autenticación
│   ├── app.html
│   ├── app.scss
│   ├── app.routes.ts
│   └── app.ts
├── styles.scss                 # Estilos globales
└── typings.d.ts               # Tipos globales
```

## 🔧 Configuración del Proyecto

### Variables de Entorno
El proyecto utiliza variables de entorno para configuraciones sensibles. Crea un archivo `.env` en la raíz del proyecto:

```bash
# Google OAuth Configuration
# Replace with your actual Google Client ID from Google Cloud Console
GOOGLE_CLIENT_ID=your-google-client-id-here.apps.googleusercontent.com

# Environment
NODE_ENV=development
```

**Nota**: 
- El archivo `.env` está incluido en `.gitignore` para proteger información sensible
- Los archivos `environment.ts` y `environment.prod.ts` leen las variables desde `process.env`
- Si no se encuentra la variable `GOOGLE_CLIENT_ID`, se usará un valor por defecto

### Google Sign-In
El componente está configurado para usar el Client ID de Google desde las variables de entorno:
- **Desarrollo**: `src/environments/environment.ts` - Lee desde `process.env['GOOGLE_CLIENT_ID']`
- **Producción**: `src/environments/environment.prod.ts` - Lee desde `process.env['GOOGLE_CLIENT_ID']`

### Variables de Diseño
Los colores y estilos principales están definidos en `login.scss`:
- `$primary-color`: #4285f4 (Azul Google)
- `$secondary-color`: #34a853 (Verde Google)
- `$text-primary`: #202124 (Texto principal)
- `$text-secondary`: #5f6368 (Texto secundario)

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <repository-url>
   cd um.tesoreria.chequera-client
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**:
   ```bash
   npm start
   ```
   o directamente:
   ```bash
   ng serve
   ```

4. **Configurar variables de entorno**:
   ```bash
   # Copiar el archivo de ejemplo
   cp .env.example .env
   
   # Editar el archivo .env con tus valores reales
   nano .env
   ```

5. **Abrir en el navegador**:
   ```
   http://localhost:4200
   ```

### Scripts Disponibles

```bash
# Desarrollo
npm start              # ng serve - Servidor de desarrollo
ng serve               # Comando directo de Angular CLI
npm run watch          # ng build --watch --configuration development

# Producción
npm run build          # ng build - Build para producción
ng build               # Comando directo de Angular CLI

# Testing
npm test               # ng test - Ejecutar tests
ng test                # Comando directo de Angular CLI

# Angular CLI
ng                     # Ver todos los comandos disponibles
```

## 🎨 Características de Diseño

### Sistema de Diseño
- **Variables SCSS**: Sistema de colores y espaciado coherente
- **Mixins reutilizables**: Componentes de UI estandarizados
- **Responsive breakpoints**: Adaptación automática a diferentes pantallas
- **Animaciones CSS**: Transiciones suaves y micro-interacciones

### Estados del Componente
- **Loading state**: Spinner durante la autenticación
- **Error handling**: Mensajes visuales con iconos
- **Success feedback**: Confirmación de autenticación exitosa
- **Google Services loading**: Manejo de carga de servicios externos

### Accesibilidad
- **Focus states**: Navegación por teclado mejorada
- **Contraste adecuado**: Cumplimiento de estándares WCAG
- **Reduced motion**: Soporte para preferencias de accesibilidad
- **Textos alternativos**: Descripciones para lectores de pantalla

## 🔄 Nuevas Características de Angular 20

### Control Flow Moderno
El proyecto utiliza el nuevo control flow de Angular 20:
```html
<!-- Antes (Angular 17 y anteriores) -->
<div *ngIf="condition">Content</div>

<!-- Ahora (Angular 20) -->
@if (condition) {
  <div>Content</div>
}
```

### Signals y Reactividad
```typescript
// Servicio de autenticación con signals
private userSignal = signal<User | null>(null);
public user = this.userSignal.asReadonly();
```

### Standalone Components
Todos los componentes son standalone, mejorando la modularidad y tree-shaking.

### Configuración TypeScript Estricta
- `strict: true`
- `noImplicitOverride: true`
- `strictTemplates: true`
- `strictInjectionParameters: true`

## 🔐 Autenticación y Seguridad

### Flujo de Autenticación
1. **Inicialización**: Carga de Google Identity Services
2. **Renderizado**: Botón de Google Sign-In
3. **Callback**: Manejo de respuesta de autenticación
4. **Token Processing**: Decodificación JWT
5. **User Storage**: Persistencia en localStorage
6. **State Management**: Actualización de signals

### Manejo de Tokens
- **JWT Decodification**: Procesamiento seguro de tokens
- **Error Handling**: Manejo robusto de errores de autenticación
- **Session Persistence**: Almacenamiento local de sesión
- **Logout Functionality**: Limpieza de datos de sesión

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Características Mobile-First
- **Touch-friendly**: Botones optimizados para touch
- **Viewport optimization**: Meta tags apropiados
- **Performance**: Carga optimizada para dispositivos móviles

## 🧪 Testing

### Framework de Testing
- **Karma**: Test runner
- **Jasmine**: Framework de testing
- **Chrome Launcher**: Ejecución en navegador real

### Cobertura de Tests
```bash
npm test -- --code-coverage
```

## 🔧 Personalización

### Cambiar Colores
Modifica las variables en `src/app/components/login/login.scss`:
```scss
$primary-color: #tu-color-principal;
$secondary-color: #tu-color-secundario;
```

### Cambiar Logo
Reemplaza el SVG en `login.html` o modifica la clase `.app-logo` en `login.scss`.

### Agregar Nuevos Estados
Extiende el componente TypeScript agregando nuevas propiedades y métodos para manejar estados adicionales.

## 🚧 Próximas Mejoras

### Funcionalidades Planificadas
- [ ] Integración con backend para autenticación real
- [ ] Sistema de notificaciones toast
- [ ] Validación de formularios avanzada
- [ ] Tests unitarios y de integración completos
- [ ] Internacionalización (i18n)
- [ ] PWA capabilities
- [ ] Server-side rendering (SSR)
- [ ] Defer loading para mejor performance

### Mejoras Técnicas
- [ ] Lazy loading de componentes
- [ ] Optimización de bundle size
- [ ] Implementación de interceptors HTTP
- [ ] State management con NgRx
- [ ] E2E testing con Playwright

## 🤝 Contribución

1. **Fork** el proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Guías de Contribución
- Sigue las convenciones de Angular
- Mantén la cobertura de tests
- Documenta nuevos features
- Usa TypeScript strict mode

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo
- Revisar la documentación de Angular

---

**Desarrollado con ❤️ usando Angular 20 y las mejores prácticas de desarrollo web moderno.**
