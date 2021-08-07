const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  username: {
    type: String,
    required: [true, "El username debe ser necesario"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  // evento: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Evento",
  //   },
  // ],
});

usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });

usuarioSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
