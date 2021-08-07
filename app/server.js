require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// sin instalar body-parser, podemos usar las siguientes línea
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

app.use(require("./routes/index"));

mongoose
  .connect("mongodb://localhost:27017/evento", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Base de datos ONLINE");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT);
});
