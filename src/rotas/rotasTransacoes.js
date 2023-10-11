const express = require("express");

const { listarCategorias } = require("../controladores/categorias");

const {
  cadastraTransacao,
  listaTransacao,
  deletaTransacao,
  emiteExtrato,
  detalharTransacao,
  atualizarTransacao,
} = require("../controladores/transacoes");

const verificarUsuarioLogado = require("../intermediarios/autenticacao");
const verificaCamposTransacao = require("../intermediarios/verificaCamposTransacao");

const rotasTransacoes = express();

rotasTransacoes.use(verificarUsuarioLogado);

rotasTransacoes.get("/categoria", listarCategorias);

rotasTransacoes.get("/transacao/extrato", emiteExtrato);
rotasTransacoes.get("/transacao/:id", detalharTransacao);
rotasTransacoes.put(
  "/transacao/:id",
  verificaCamposTransacao,
  atualizarTransacao
);

rotasTransacoes.post("/transacao", verificaCamposTransacao, cadastraTransacao);
rotasTransacoes.get("/transacao", listaTransacao);
rotasTransacoes.delete("/transacao/:id", deletaTransacao);

module.exports = rotasTransacoes;
