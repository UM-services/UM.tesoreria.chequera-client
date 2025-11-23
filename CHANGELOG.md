# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-23

### Agregado (Added)
- **Nuevo Componente Sidebar**
  - Navegación lateral responsiva con enlaces a Inicio, Mi Chequera, Mi Perfil y Configuración.
  - Integración con `RouterLink` y `RouterLinkActive` para gestión de estado de navegación.
- **Migración a Tailwind CSS**
  - Configuración inicial de Tailwind CSS (`tailwind.config.js`).
  - Integración de directivas de Tailwind en `styles.scss`.
  - Reemplazo de estilos SCSS personalizados por clases utilitarias de Tailwind en componentes principales.

### Cambiado (Changed)
- **Actualización de Dependencias**
  - Angular actualizado a `^21.0.0`.
  - TypeScript actualizado a `~5.9.3`.
- **Refactorización de UI**
  - `app.html` actualizado para usar un layout con Sidebar y Tailwind.
  - `login.html` refactorizado para usar clases de Tailwind.

## [0.0.1] - 2025-06-24

### Agregado (Added)
- **Actualización de Documentación y Mejoras de UI** (`6ed1017`)
  - Se actualizó `README.md` y `CHANGELOG.md` para reflejar los últimos cambios.
  - Se mejoró la interfaz de usuario con ajustes de estilo y un nuevo logo.
- **Soporte para Variables de Entorno en Docker** (`23c2a4e`)
  - Script para generar `environment.ts` a partir de variables de entorno durante el `docker build`.
- **Configuración de Docker** (`dd069f0`)
  - `Dockerfile` para producción con Nginx.
  - `Dockerfile.local` para desarrollo con hot-reload.
  - `entrypoint.sh` para la gestión del contenedor.
- **Mejoras en UI y Manejo de Errores** (`65b9fa5`)
  - Reemplazo de logo SVG por PNG.
  - Botón "Intentar de nuevo" en la pantalla de error.

### Cambiado (Changed)
- **Pruebas de Despliegue** (`b4edd43`)
  - Ajustes para el primer despliegue en producción.

## [0.0.0] - Versión Inicial

- **Primer Commit** (`d5edf54`)
  - Configuración inicial del proyecto con Angular.
  - Implementación de autenticación con Google OAuth 2.0.
  - Estructura base de componentes (login, dashboard, facultad-selector).

---
*Nota: La versión y fecha son asignadas para esta actualización. El historial de commits se ha obtenido de `git log`.*