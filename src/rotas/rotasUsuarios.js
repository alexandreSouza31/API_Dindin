const express = require("express");

const {
  cadastrarUsuario,
  login,
  detalharUsuario,
  atualizarUsuario,
} = require("../controladores/usuarios");

const verificaEmailExistente = require("../intermediarios/verificaemail");
const verificarUsuarioLogado = require("../intermediarios/autenticacao");
const verificaEmailEId = require("../intermediarios/verificaEmailEId");
const verificaCamposUsuario = require("../intermediarios/verificaCamposUsuario");

const rotasUsuario = express();

rotasUsuario.post("/usuario", verificaEmailExistente,verificaCamposUsuario, cadastrarUsuario);
rotasUsuario.post("/login", login);

rotasUsuario.use(verificarUsuarioLogado);

rotasUsuario.get("/usuario", detalharUsuario);
rotasUsuario.put("/usuario", verificaEmailEId,verificaCamposUsuario, atualizarUsuario);

module.exports = rotasUsuario;
