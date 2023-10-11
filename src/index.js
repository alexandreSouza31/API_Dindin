const express = require("express");
const rotasTransacoes = require("./rotas/rotasTransacoes");
const rotasUsuario = require("./rotas/rotasUsuarios");
//const rotas = require("./rotas");
const app = express();

app.use(express.json());
app.use(rotasUsuario);
app.use(rotasTransacoes);

app.listen(3000);
