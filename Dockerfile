# Etapa 1: Compilar la aplicación de Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
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
