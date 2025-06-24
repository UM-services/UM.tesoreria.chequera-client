# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.0]

### Agregado (Added)
- **Soporte para variables de entorno y generación automática de archivos `environment` en Docker build** (`23c2a4e` - hace 21 horas)
  - Se integró un script para generar `environment.ts` dinámicamente a partir de variables de entorno, facilitando los despliegues.
- **Configuración de Docker y mejoras en el proceso de build** (`dd069f0` - hace 35 horas)
  - Se añadió `Dockerfile` para producción y `Dockerfile.local` para desarrollo.
  - Se incluyó `entrypoint.sh` para gestionar el inicio del contenedor.
  - Se configuró Nginx como servidor web para la aplicación en producción.
- **Mejoras en la UI y la documentación** (`65b9fa5` - hace 2 días)
  - Se reemplazó el logo SVG por una imagen PNG para consistencia de marca.
  - Se añadió un botón "Intentar de nuevo" en la pantalla de error para mejorar la experiencia de usuario.
  - Se creó y actualizó `CHANGELOG.md` y `README.md` con información detallada del proyecto.

### Cambiado (Changed)
- **Pruebas de despliegue** (`b4edd43` - hace 21 horas)
  - Se realizaron ajustes para el primer despliegue en el entorno de producción.

### Versión Inicial
- **Primer Commit** (`d5edf54` - hace 5 días)
  - Configuración inicial del proyecto con Angular.
  - Implementación de autenticación con Google OAuth 2.0.
  - Creación de la estructura de componentes base (login, dashboard, selector de facultad).

## Información de Fuentes

- **Versión**: Extraída de `package.json` (`v0.0.0`).
- **Historial de Cambios**: Basado en el `git log`. Los resúmenes de cambios se derivan de los mensajes de commit.

## Notas

- No se han encontrado etiquetas (tags) de versión en el repositorio.
- Las fechas de los cambios son relativas para reflejar fielmente la información de `git log`.