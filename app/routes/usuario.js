const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");
const { verificaToken } = require("../middleware/autenticacion");
const app = express();

app.get("/usuario", verificaToken, function (req, res) {
  Usuario.find({}).exec((err, usuarios) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuarios,
    });
  });
});

app.post("/usuario", verificaToken, function (req, res) {
  let body = req.body;

  let usuario = new Usuario({
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

module.exports = app;
