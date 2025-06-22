# Configuración Segura de Variables de Ambiente

## 🛡️ Seguridad Implementada

La aplicación ahora maneja las variables de ambiente de manera segura:

- ✅ **NO** incluye valores sensibles en el repositorio
- ✅ **SÍ** incluye archivos de ejemplo
- ✅ Genera archivos de environment dinámicamente desde `.env`
- ✅ Los archivos generados están en `.gitignore`

## 📁 Estructura de Archivos

### Archivos de Ejemplo (incluidos en repo)
- `src/environments/environment.example.ts`
- `src/environments/environment.development.example.ts`
- `src/environments/environment.prod.example.ts`

### Archivos Generados (excluidos del repo)
- `src/environments/environment.ts` ⚠️ **NO en repo**
- `src/environments/environment.development.ts` ⚠️ **NO en repo**
- `src/environments/environment.prod.ts` ⚠️ **NO en repo**

## 🚀 Configuración Inicial

### 1. Crear archivo `.env`
```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=tu_client_id_real_de_google.apps.googleusercontent.com

# Backend URL
BACKEND_URL=http://127.0.0.1:8121

# Environment
NODE_ENV=development
```

### 2. Generar archivos de environment
```bash
npm run generate-env
```

### 3. Ejecutar la aplicación
```bash
npm start
```

## 🔄 Flujo de Trabajo

### Para Desarrollo
```bash
npm start
```
- Automáticamente ejecuta `prestart` que genera los archivos
- Usa valores del archivo `.env`

### Para Producción
```bash
npm run build
```
- Automáticamente ejecuta `prebuild` que genera los archivos
- Usa valores del archivo `.env`

### Generación Manual
```bash
npm run generate-env
```

## 📋 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Desarrollo con generación automática de env |
| `npm run build` | Build de producción con generación automática |
| `npm run generate-env` | Generar archivos de environment manualmente |

## 🔍 Verificación

Después de configurar, verifica en la consola del navegador:
- ✅ Client ID cargado correctamente
- ✅ Backend URL configurada correctamente
- ✅ API de Google disponible
- ✅ Google Sign-In inicializado

## ⚠️ Notas Importantes

1. **Nunca commits archivos de environment** con valores reales
2. **Siempre usa `.env`** para valores sensibles
3. **Los archivos de ejemplo** están en el repo para referencia
4. **El script automático** maneja la generación de archivos

## 🆘 Solución de Problemas

### Si no tienes archivo `.env`
- Se copiarán automáticamente los archivos de ejemplo
- Configura tu `.env` y ejecuta `npm run generate-env`

### Si los archivos no se generan
- Verifica que el archivo `.env` existe
- Verifica que tiene el formato correcto
- Ejecuta `npm run generate-env` manualmente 