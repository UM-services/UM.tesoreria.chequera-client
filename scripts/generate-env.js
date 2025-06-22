const fs = require('fs');
const path = require('path');

// Leer el archivo .env
function readEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  
  if (!fs.existsSync(envPath)) {
    console.log('⚠️  Archivo .env no encontrado. Copiando archivos de ejemplo...');
    return null;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, value] = trimmedLine.split('=');
      if (key && value) {
        envVars[key.trim()] = value.trim();
      }
    }
  });
  
  return envVars;
}

// Copiar archivos de ejemplo
function copyExampleFiles() {
  const files = [
    { from: 'environment.example.ts', to: 'environment.ts' },
    { from: 'environment.development.example.ts', to: 'environment.development.ts' },
    { from: 'environment.prod.example.ts', to: 'environment.prod.ts' }
  ];
  
  files.forEach(file => {
    const fromPath = path.join(__dirname, '..', 'src', 'environments', file.from);
    const toPath = path.join(__dirname, '..', 'src', 'environments', file.to);
    
    if (fs.existsSync(fromPath)) {
      fs.copyFileSync(fromPath, toPath);
      console.log(`📋 Copiado: ${file.from} → ${file.to}`);
    } else {
      console.log(`⚠️  Archivo de ejemplo no encontrado: ${file.from}`);
    }
  });
}

// Generar el contenido del archivo environment
function generateEnvironmentContent(envVars, isProduction = false) {
  return `export const environment = {
  production: ${isProduction},
  googleClientId: '${envVars.GOOGLE_CLIENT_ID || ''}',
  backendUrl: '${envVars.BACKEND_URL || 'http://127.0.0.1:8121'}'
};
`;
}

// Función principal
function generateEnvironments() {
  try {
    const envVars = readEnvFile();
    
    if (!envVars) {
      copyExampleFiles();
      console.log('✅ Archivos de ejemplo copiados. Configura tu archivo .env para usar valores reales.');
      return;
    }
    
    // Generar environment.ts (desarrollo)
    const devContent = generateEnvironmentContent(envVars, false);
    fs.writeFileSync(
      path.join(__dirname, '..', 'src', 'environments', 'environment.ts'),
      devContent
    );
    
    // Generar environment.development.ts
    fs.writeFileSync(
      path.join(__dirname, '..', 'src', 'environments', 'environment.development.ts'),
      devContent
    );
    
    // Generar environment.prod.ts (producción)
    const prodContent = generateEnvironmentContent(envVars, true);
    fs.writeFileSync(
      path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts'),
      prodContent
    );
    
    console.log('✅ Archivos de environment generados correctamente');
    console.log('📝 Google Client ID:', envVars.GOOGLE_CLIENT_ID);
    console.log('🌐 Backend URL:', envVars.BACKEND_URL || 'http://127.0.0.1:8121 (por defecto)');
  } catch (error) {
    console.error('❌ Error generando archivos de environment:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  generateEnvironments();
}

module.exports = { generateEnvironments }; 