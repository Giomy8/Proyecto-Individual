const app = require("./src/app");
require('dotenv').config();
const {PORT} = process.env;
const { conn } = require('./src/db');

conn.sync({ alter:true })//force false para produccion - alter:true actualiza los cambios sin borrar / force: true borra cada vez que se inicia el servidor
.then(() => { 
  console.log("Conexion a la base de datos establecida");
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
})
.catch((err) => {
  console.log(err);
})
