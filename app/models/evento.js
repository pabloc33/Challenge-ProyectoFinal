const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let validos = {
  values: ["DESTACADO", "NO_DESTACADO"],
  message: "{VALUE} no es una opción valida",
};

let Schema = mongoose.Schema;

let eventoSchema = new Schema({
  titulo: {
    type: String,
    unique: true,
    required: [true, "El título es necesario"],
  },
  descripcion: {
    type: String,
    required: [true, "Debe haber una descripción"],
  },
  lista: [
    {
      fecha: {
        type: Date,
        required: [true, "Debe haber una fecha"],
      },
      precio: {
        type: Number,
        min: 0,
      },
    },
  ],
  // fechas: {
  //   type: [String],
  //   required: [true, "Las fechas son requeridas"],
  // },
  lugar: {
    type: String,
    required: [true, "Es necesario colocar un lugar"],
  },
  destacado: {
    type: String,
    default: "NO_DESTACADO",
    enum: validos,
  },
  img: {
    type: String,
    required: false,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

eventoSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });

eventoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.lista._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Evento", eventoSchema);
