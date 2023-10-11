require("dotenv").config();

const pool = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, senhaCriptografada]
    );

    const { id, nome: usuarioNome, email: usuarioEmail } = novoUsuario.rows[0];

    return res.status(201).json({ id, nome: usuarioNome, email: usuarioEmail });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await pool.query(
      "select * from usuarios where email = $1",
      [email]
    );

    if (usuario.rowCount < 1) {
      return res.status(401).json({
        mensagem: "Usuário e/ou senha inválido(s).",
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: "Usuário e/ou senha inválido(s).",
      });
    }

    const token = jwt.sign({ id: usuario.rows[0].id }, process.env.SENHA_JWT, {
      expiresIn: "8h",
    });

    const { senha: _, ...usuarioLogado } = usuario.rows[0];

    return res.json({ usuario: usuarioLogado, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const detalharUsuario = async (req, res) => {
  const { senha: _, ...usuarioSemSenha } = req.usuario;
  return res.json(usuarioSemSenha);
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;

  try {

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await pool.query(
      "update usuarios set nome = $1, email = $2, senha = $3 WHERE id = $4",
      [nome, email, senhaCriptografada, id]
    );

    return res.status(204).send();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Erro interno do servidor");
  }
};

module.exports = {
  cadastrarUsuario,
  login,
  detalharUsuario,
  atualizarUsuario,
};
