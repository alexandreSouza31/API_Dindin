const pool = require("../conexao");

const verificaCamposUsuario = async (req, res, next) => {
  const { nome, email, senha } = req.body;

  try {
    if (!nome && !email && !senha) {
      return res.status(400).json({
        mensagem: "Todos os campos devem ser preenchidos!",
      });
    }

    if (!nome) {
      return res
        .status(400)
        .json({ mensagem: "O campo 'nome' deve ser preenchido!" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ mensagem: "O campo 'email' deve ser preenchido!" });
    }

    if (!senha) {
      return res
        .status(400)
        .json({ mensagem: "O campo 'senha' deve ser preenchido!" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = verificaCamposUsuario;
