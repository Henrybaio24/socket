const env = require("dotenv").config(),
  app = require("./app"),
  port = process.env.PORT || 3000;

let http = require("http").Server(app),
  io = require("../controllers/socket.controller")(http);

http.listen(port, function(error){
    if(error) return console.log(error);
    console.log(`Servidor corriendo en el puerto: ${port}`);
})
