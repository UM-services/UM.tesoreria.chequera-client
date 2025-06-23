# Etapa 1: Compilar la aplicación de Angular
FROM node:20-alpine AS build

# Definir build arguments para las variables de entorno
ARG GOOGLE_CLIENT_ID
ARG BACKEND_URL

WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente
COPY . .

# Crear archivo .env con las variables de entorno del build
RUN echo "GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID:-YOUR_GOOGLE_CLIENT_ID_HERE}" > .env && \
    echo "BACKEND_URL=${BACKEND_URL:-http://127.0.0.1:8121}" >> .env

# Generar archivos de environment
RUN npm run generate-env

# Compilar la aplicación
RUN npm run build -- --configuration production

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:stable-alpine
# Copia los artefactos de la compilación de Angular desde la etapa anterior
COPY --from=build /app/dist/chequera-client/browser /usr/share/nginx/html
# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia el script de entrada que manejará las variables de entorno
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Puerto y punto de entrada
EXPOSE 80
ENTRYPOINT ["entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
