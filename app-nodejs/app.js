const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const uri = "mongodb://fercho:unir2023@db_mongodb:27017";
const client = new MongoClient(uri);
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

async function main() {
  try {
    await client.connect();
    console.log("Conectado a la base de datos");
    const db = client.db();
    const studentsCollection = db.collection('students');

    app.get('/', async (req, res) => {
      const students = await studentsCollection.find().toArray();
      res.render('index', { estudiantes: students });
    });

    app.get('/agregar', (req, res) => {
      res.render('agregar');
    });

    app.post('/estudiantes', async (req, res) => {
      await studentsCollection.insertOne(req.body);
      res.redirect('/');
    });

    app.get('/estudiantes/editar/:id', async (req, res) => {
      const estudiante = await studentsCollection.findOne({ _id: new ObjectId(req.params.id) });
      res.render('editar', { estudiante: estudiante });
    });

    app.post('/estudiantes/:id', async (req, res) => {
      await studentsCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
      res.redirect('/');
    });

    app.post('/estudiantes/eliminar/:id', async (req, res) => {
      await studentsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      res.redirect('/');
    });

    app.get('/health', (req, res) => {
      res.status(200).send('OK');
    });

  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
