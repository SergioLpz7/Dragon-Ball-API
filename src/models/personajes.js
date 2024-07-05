const mongoose = require("mongoose");

const personajesSchema = mongoose.Schema({

  nombre:{
    type: String,
    required: true    
  },
  raza:{
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  },
  planeta: {
    type: String,
    required: false
  },
  habilidad: {
    type: String,
    required: false
  },
  transformaciones: {
    type: Array,
    required: false
  },
  picture:{
    type: String,
    required: true
  }
});

personajesSchema.methods.setImgUrl = function setImgUrl(filename){
  this.picture = `public/${filename}`
}

module.exports = mongoose.model('Personaje', personajesSchema)