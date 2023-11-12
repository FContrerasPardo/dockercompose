const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Estudiante = require('./models/estudiante'); // Asegúrate de que el modelo está en la ruta correcta

const app = express();
const uri = "mongodb://fercho:unir2023@db_mongodb:27017";
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Ruta para la lista de estudiantes
app.get('/', (req, res) => {
  Estudiante.find({}, (err, estudiantes) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al obtener estudiantes');
    } else {
      res.render('index', { estudiantes: estudiantes });
    }
  });
});

// Ruta para mostrar el formulario de nuevo estudiante
app.get('/agregar', (req, res) => {
  res.render('agregar');
});

// Ruta para procesar el formulario de nuevo estudiante
app.post('/estudiantes', (req, res) => {
  const nuevoEstudiante = new Estudiante(req.body);
  nuevoEstudiante.save(err => {
    if (err) {
      console.log(err);
      res.redirect('/agregar');
    } else {
      console.log('Estudiante Agregado');
      res.redirect('/');
    }
  });
});

// Ruta para la vista de editar un estudiante
app.get('/estudiantes/editar/:id', (req, res) => {
  Estudiante.findById(req.params.id, (err, estudiante) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al encontrar estudiante');
    } else {
      res.render('editar', { estudiante: estudiante });
    }
  });
});

// Ruta para actualizar la información de un estudiante
app.post('/estudiantes/:id', (req, res) => {
  Estudiante.findByIdAndUpdate(req.params.id, req.body, err => {
    if (err) {
      console.log(err);
      res.redirect('/estudiantes/editar/' + req.params.id);
    } else {
      res.redirect('/');
    }
  });
});

// Ruta para eliminar un estudiante
app.post('/estudiantes/eliminar/:id', (req, res) => {
  Estudiante.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
