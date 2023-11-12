# Utiliza una imagen base ligera de Node.js basada en Alpine Linux
FROM node:18-alpine

# Establece el directorio de trabajo donde se alojará la aplicación en el contenedor
WORKDIR /app

# Copia los archivos de definición de paquetes para instalar dependencias
COPY package*.json ./

# Instala las dependencias del proyecto en el contenedor
RUN npm install

# Instala curl para realizar comprobaciones de salud en el contenedor
RUN apk --no-cache add curl

# Define el comando de comprobación de salud para la aplicación
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:3000/health || exit 1

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Cambia la propiedad de los archivos de la aplicación al usuario no root
RUN chown -R node /app

# Cambia al usuario no root para mayor seguridad
USER node

# Expone el puerto 3000 que la aplicación utiliza
EXPOSE 3000

# Comando para ejecutar la aplicación cuando el contenedor inicie
CMD ["node", "app.js"]