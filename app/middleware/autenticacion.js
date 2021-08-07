const jwt = require("jsonwebtoken");

let verificaToken = (req, res, next) => {
  let token = req.get("token");

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Token no válido",
        },
      });
    }

    req.usuario = decoded.usuario;
    next();
  });

  // res.json({
  //   token: token,
  // });
};

module.exports = {
  verificaToken,
};
