
const User = require("../models/User"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

let login = (req, res) => {
  let { data } = req.body,
    email = data.email,
    password = data.password;

  User.find({ email })
    .then((data) => {
      if (data[0].email === email) {
        let token,
          tokenB = {
            nombre: data[0].nombre,
            email: data[0].email,
            sessionID: data[0].sessionID,
          };
        bcrypt.compareSync(password, data[0].password)
          ? ((token = jwt.sign({ data: tokenB }, process.env.KEY_JWT, {
              algorithm: "HS256",
              expiresIn: 300,
            })),
            res.status(200).json({
              ok: true,
              data: null,
              msg: "Listo...",
              token,
            }))
          : res.status(404).json({
              ok: false,
              data: null,
              msg: "Password Incorrecto",
              token: null,
            });
      }
    })
    .catch((err) => {
      res.status(404).json({
        ok: false,
        data: null,
        msg: "Email incorrecto....",
      });
    });
};

module.exports = {
  login
};
