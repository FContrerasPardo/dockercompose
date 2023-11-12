# Utiliza una imagen base oficial de Node.js versión 18 con Alpine Linux por ser ligera y rápida
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor para almacenar los archivos de la aplicación
WORKDIR /app

# Copia los archivos necesarios al contenedor
COPY package.json package-lock.json /app/
COPY app.js /app/
COPY views /app/views/
COPY models /app/models/

# Instala las dependencias del proyecto en el contenedor
RUN npm install

# Instala curl, útil para comprobaciones de salud y diagnósticos
RUN apk add curl

# Define un comando de comprobación de salud para verificar que la aplicación está en funcionamiento
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:3000/health || exit 1

# configura el no cache
RUN apk add --no-cache su-exec

# Crea un grupo y establece el directorio de trabajo de la aplicación.
# Se asume que el usuario 'node' y el grupo 'node' ya existen en la imagen base de Node.js.
RUN mkdir -p /app \
    && chown -R node:node /app \
    && apk del su-exec

# Cambia al usuario 'node' no root y establece el directorio de trabajo en /app.
USER node
WORKDIR /app

# Expone el puerto 3000 que la aplicación utiliza
EXPOSE 3000

# Comando para ejecutar la aplicación cuando el contenedor inicie
CMD ["node", "app.js"]