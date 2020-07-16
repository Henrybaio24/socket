let gestionDocumentos= (http) => {
  let io = require("socket.io")(http),
    socketJwt = require("socketio-jwt");

  io.use(
    socketJwt.authorize({
      secret: process.env.KEY_JWT,
      handshake: true,
    })
  );
  const gestionDatos = {};

  io.on("connection", (socket) => {
    let anteriorId;

    const safeJoin = (actualId) => {
      socket.leave(anteriorId);
      socket.join(actualId);
      anteriorId = actualId;
    };
    socket.on("getDoc", (id) => {
      safeJoin(id);
      socket.emit("gestionDato", gestionDatos[id]);

    });

    socket.on("addDoc", (doc) => {
      let salas = Object.keys(gestionDatos),
        numeroSalas = salas.length + 1,
        nombreSala = `doc ${numeroSalas}`;

      doc.id = nombreSala;

      gestionDatos[doc.id] = doc;
      safeJoin(doc.id);
      io.emit("gestionDatos", Object.keys(gestionDatos));
      socket.emit("gestionDato", doc);
    });

    socket.on("editDoc", (doc) => {
      gestionDatos[doc.id] = doc;
      socket.to(doc.id).emit("gestionDato", doc);
    });

    io.emit("gestionDatos", Object.keys(gestionDatos));
  });
};

module.exports = gestionDocumentos;
