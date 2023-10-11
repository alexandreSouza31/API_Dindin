const pool = require("../conexao");

const verificaEmailExistente = async (req, res, next) => {
  const { email } = req.body;

  try {
    const usuarioExiste = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (usuarioExiste.rowCount > 0) {
      return res.status(401).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
};

module.exports = verificaEmailExistente;
