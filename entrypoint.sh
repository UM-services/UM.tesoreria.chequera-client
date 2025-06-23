#!/bin/sh

# Directorio donde se encuentran los archivos JS de Angular
ROOT_DIR=/usr/share/nginx/html

echo "--- App Entrypoint Script Start ---"
echo "Received GOOGLE_CLIENT_ID: [${GOOGLE_CLIENT_ID}]"
echo "Received BACKEND_URL: [${BACKEND_URL}]"
echo "-------------------------------------"

# Reemplazar placeholders con valores de las variables de entorno
echo "Searching for files to process..."
for file in $ROOT_DIR/*.js;
do
  if [ -f "$file" ]; then
    echo "Processing file: $file";

    echo " > Searching for GOOGLE_CLIENT_ID placeholder..."
    grep -q "YOUR_GOOGLE_CLIENT_ID_HERE" "$file"
    if [ $? -eq 0 ]; then
        echo "   ... Placeholder found. Replacing."
        sed -i 's#YOUR_GOOGLE_CLIENT_ID_HERE#'"$GOOGLE_CLIENT_ID"'#g' "$file"
    else
        echo "   ... GOOGLE_CLIENT_ID placeholder not found in this file."
    fi

    echo " > Searching for BACKEND_URL placeholder..."
    grep -q "YOUR_BACKEND_URL_HERE\|http://127.0.0.1:8121" "$file"
    if [ $? -eq 0 ]; then
        echo "   ... Placeholder found. Replacing."
        sed -i 's#YOUR_BACKEND_URL_HERE\|http://127.0.0.1:8121#'"$BACKEND_URL"'#g' "$file"
    else
        echo "   ... BACKEND_URL placeholder not found in this file."
    fi
  fi
done

echo "-----------------------------------"
echo "--- App Entrypoint Script End ---"
echo ""

# Ejecuta el comando original del contenedor (iniciar Nginx)
echo "Starting Nginx..."
exec "$@" 