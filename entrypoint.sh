#!/bin/sh

# Directorio donde se encuentran los archivos JS de Angular
ROOT_DIR=/usr/share/nginx/html

echo "--- App Entrypoint Script Start ---"
echo "Received GOOGLE_CLIENT_ID: [${GOOGLE_CLIENT_ID}]"
echo "Received BACKEND_URL: [${BACKEND_URL}]"
echo "-------------------------------------"

# Reemplazar placeholders con valores de las variables de entorno
echo "Searching for files to process..."
for file in $ROOT_DIR/main-*.js;
do
  if [ -f "$file" ]; then
    echo "Processing file: $file";

    echo " > Searching for GOOGLE_CLIENT_ID placeholder..."
    grep -q "VITE_GOOGLE_CLIENT_ID_PLACEHOLDER" "$file"
    if [ $? -eq 0 ]; then
        echo "   ... Placeholder found. Replacing."
        sed -i 's#VITE_GOOGLE_CLIENT_ID_PLACEHOLDER#'"$GOOGLE_CLIENT_ID"'#g' "$file"
    else
        echo "   ... WARNING: GOOGLE_CLIENT_ID placeholder not found."
    fi

    echo " > Searching for BACKEND_URL placeholder..."
    grep -q "VITE_BACKEND_URL_PLACEHOLDER" "$file"
    if [ $? -eq 0 ]; then
        echo "   ... Placeholder found. Replacing."
        sed -i 's#VITE_BACKEND_URL_PLACEHOLDER#'"$BACKEND_URL"'#g' "$file"
    else
        echo "   ... WARNING: BACKEND_URL placeholder not found."
    fi
  else
    echo "WARNING: File matching main.*.js not found in $ROOT_DIR."
  fi
done

echo "-----------------------------------"
echo "--- App Entrypoint Script End ---"
echo ""

# Ejecuta el comando original del contenedor (iniciar Nginx)
echo "Starting Nginx..."
exec "$@" 