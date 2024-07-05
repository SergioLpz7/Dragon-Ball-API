const express = require("express");
const personajesSchema = require('../models/personajes')
const upload = require('../libs/storage')
const router = express.Router();

// Crear personajes

router.post('/personajes', upload.single('image'), (req, res) => {
  const personajes = personajesSchema(req.body)
  if(req.file){
    const{filename}=req.file
    personajes.setImgUrl(filename)
  }
  personajes.save()
  .then((data) => res.json(data))
  .catch((error) => res.json({mensaje: error }))
});


// Listar todas los
router.get('/personajes', (req, res) =>{
  res.header('Access-Control-Allow-Origin', '*')
  personajesSchema
  .find()
  .then((data) => res.json(data))
  .catch((error) => res.json({mensaje: error}))
});

// actualizar una personaje por ID
router.put('/personajes/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, raza, status, planeta, habilidad, transformaciones } =
  req.body;
  personajesSchema
  .updateOne({_id : id}, {$set: {nombre, raza, status, planeta, habilidad, transformaciones}})
  .then((data) => res.json(data))
  .catch((error) => res.json({message:(error)}))
})
// Borrar un personaje por ID
router.delete('/personajes/:id', (req, res) => {
  const {id} = req.params;
  personajesSchema
  .deleteOne ({ _id : id})
  .then((data) => res.json(data))
  .catch((error) => res.json({message: (error)}))
})

module.exports = router;