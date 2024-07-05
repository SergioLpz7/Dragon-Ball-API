const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const rutasPersonajes = require("./routes/personajes");

const app = express();
const puerto = process.env.PORT || 9000;

// middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", rutasPersonajes);

app.use("/public", express.static(`${__dirname}/uploads`));

//RUTA
app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});
app.listen(puerto, () => console.log("Server listening at port: ", puerto));
// Conexión a MONGODB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conected to Database"))
  .catch((error) => console.error(error));


app.use('/dragon_ball',express.static(`${__dirname}/dragon_ball`))
app.use('/management', express.static(`${__dirname}/management`))