const express = require("express");
const { verificaToken } = require("../middleware/autenticacion");
const Evento = require("../models/evento");
const app = express();

app.get("/evento", verificaToken, function (req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Evento.find({})
    .skip(desde)
    .limit(limite)
    .sort("destacado")
    .populate("usuario", "username email")
    .exec((err, eventos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      Evento.countDocuments({}, (err, conteo) => {
        res.json({
          ok: true,
          eventos,
          cuantos: conteo,
        });
      });
    });
});

app.post("/evento", verificaToken, (req, res) => {
  let body = req.body;

  let evento = new Evento({
    titulo: body.titulo,
    descripcion: body.descripcion,
    lista: body.lista,
    lugar: body.lugar,
    destacado: body.destacado,
    img: body.img,
    usuario: req.usuario.id,
  });

  evento.save((err, eventoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!eventoDB) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      evento: eventoDB,
    });
  });
});

app.put("/evento/:id", verificaToken, function (req, res) {
  let id = req.params.id;
  let body = req.body;

  Evento.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, eventoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }

      if (!eventoDB) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        evento: eventoDB,
      });
    }
  );
});

app.delete("/evento/:id", function (req, res) {
  let id = req.params.id;

  Evento.findByIdAndRemove(id, (err, eventoBorrado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!eventoBorrado) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Evento no encontrado",
        },
      });
    }

    res.json({
      ok: true,
      message: "Categoria Borrada",
    });
  });
});

module.exports = app;
