# Sistema de Chequera - Cliente Angular

![Version](https://img.shields.io/badge/version-0.0.0-blue)

Este es el cliente Angular para el sistema de chequera de la Universidad de Mendoza. La aplicación permite a los usuarios autenticarse con Google y consultar información detallada de sus chequeras académicas.

## 🚀 Funcionalidades

### Autenticación
- Login con Google OAuth 2.0
- Verificación de autorización en el backend
- Gestión de sesiones persistentes

### Selección de Facultad
- Lista de facultades disponibles para el usuario
- Selección dinámica de facultad

### Consulta de Chequera
- Ingreso de número de documento
- Consulta de estado de chequera por facultad
- Visualización completa de información académica

### Información Mostrada
- **Datos Personales**: Nombre, apellido, documento
- **Información Académica**: Facultad, lectivo actual
- **Contacto**: Emails personal e institucional
- **Series de Chequera**: Detalles completos de cada serie
- **Cuotas**: Estado de pagos, vencimientos, importes
- **Pagos Realizados**: Historial de transacciones
- **MercadoPago**: Enlaces directos para pagos pendientes

## 📜 Changelog

Para ver un historial detallado de los cambios, consulta el archivo [CHANGELOG.md](CHANGELOG.md).

## 🛠️ Tecnologías Utilizadas

- **Angular 20** - Framework principal
- **TypeScript** - Lenguaje de programación
- **SCSS** - Estilos avanzados
- **RxJS** - Programación reactiva
- **Google Identity Services** - Autenticación OAuth

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- Backend del sistema corriendo en `http://127.0.0.1:8121`

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd um.tesoreria.chequera-client
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y configura tus credenciales:

```bash
cp src/environments/environment.development.example.ts src/environments/environment.development.ts
```

Edita `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  googleClientId: 'TU_GOOGLE_CLIENT_ID_AQUI',
  backendUrl: 'http://127.0.0.1:8121'
};
```

### 4. Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Identity Services
4. Crea credenciales OAuth 2.0
5. Configura los orígenes autorizados:
   - `http://localhost:4200` (desarrollo)
   - `https://tu-dominio.com` (producción)
6. Copia el Client ID y pégalo en el archivo de entorno

## 🚀 Ejecutar la Aplicación

### Desarrollo
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

### Producción
```bash
npm run build
```

## 📱 Uso de la Aplicación

### 1. Login
- Accede a la aplicación
- Haz clic en "Iniciar sesión con Google"
- Autoriza la aplicación con tu cuenta de Google

### 2. Selección de Facultad
- Se mostrarán las facultades disponibles para tu usuario
- Selecciona la facultad deseada

### 3. Consulta de Chequera
- Ingresa tu número de documento
- Haz clic en "Consultar Chequera"
- Revisa la información detallada mostrada

### 4. Información Disponible
- **Estado de cuotas**: Pagadas o pendientes
- **Vencimientos**: Fechas y montos de cada vencimiento
- **Pagos realizados**: Historial completo de transacciones
- **Enlaces de pago**: Acceso directo a MercadoPago para cuotas pendientes

## 🎨 Características de Diseño

- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla
- **Interfaz Moderna**: Gradientes, sombras y animaciones suaves
- **UX Optimizada**: Estados de carga, errores y feedback visual
- **Accesibilidad**: Contraste adecuado y navegación por teclado

## 🔒 Seguridad

- Autenticación OAuth 2.0 con Google
- Verificación de autorización en el backend
- Validación de datos en el frontend
- Manejo seguro de tokens y sesiones

## 🐛 Solución de Problemas

### Error de CORS
Asegúrate de que el backend esté configurado para aceptar peticiones desde `http://localhost:4200`

### Error de Google OAuth
Verifica que el Client ID esté correctamente configurado y que los orígenes autorizados incluyan tu dominio

### Error de Conexión al Backend
Confirma que el backend esté corriendo en `http://127.0.0.1:8121` y que la URL esté correctamente configurada

## 📝 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── login/           # Componente de autenticación
│   │   ├── facultad-selector/ # Selector de facultad y consulta
│   │   ├── dashboard/       # Dashboard principal
│   │   ├── header/          # Encabezado de la aplicación
│   │   └── footer/          # Pie de página
│   ├── services/
│   │   ├── auth.service.ts  # Servicio de autenticación
│   │   ├── backend.service.ts # Servicio de comunicación con backend
│   │   └── facultad.service.ts # Servicio de gestión de facultades
│   ├── models/
│   │   └── usuario.interface.ts # Interfaces de datos
│   ├── guards/
│   │   └── auth.guard.ts    # Guard de autenticación
│   └── config/
│       └── app.config.ts    # Configuración de la aplicación
├── environments/
│   ├── environment.development.ts
│   └── environment.prod.ts
└── styles.scss              # Estilos globales
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas sobre la implementación, contacta al equipo de desarrollo.
