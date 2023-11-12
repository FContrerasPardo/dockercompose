const { MongoClient } = require('mongodb');

// Reemplaza con tu cadena de conexión completa
const uri = "mongodb://fercho:unir2023@db_mongodb:27017/school";

async function testConnection() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Conexión exitosa a la base de datos');
  } catch (err) {
    console.error('No se pudo conectar a la base de datos:', err);
  } finally {
    await client.close();
  }
}

testConnection();
