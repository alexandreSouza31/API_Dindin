const pool = require("../conexao");

const verificaCamposTransacao = async (req, res, next) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    if (!descricao && !valor && !data && !categoria_id && !tipo) {
      return res.status(400).json({
        mensagem: "Todos os campos devem ser preenchidos!",
      });
    }

    if (!descricao) {
      return res
        .status(400)
        .json({ mensagem: "O campo 'descricao' deve ser preenchido!" });
    }

    if (!valor) {
      return res
        .status(400)
        .json({ mensagem: "O campo 'valor' deve ser preenchido!" });
    }

    if (!data) {
      return res
        .status(400)
        .json({ mensagem: "O campo 'data' deve ser preenchido!" });
    }

    if (!categoria_id) {
      return res
        .status(400)
        .json({ mensagem: "O campo 'categoria_id' deve ser preenchido!" });
    }

    if (!tipo) {
      return res
        .status(400)
        .json({ mensagem: "O campo 'tipo' deve ser preenchido!" });
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      return res
        .status(400)
        .json({ mensagem: "O campo 'tipo' deve ser 'entrada' ou 'saida'." });
    }

    const categoriaExiste = await pool.query(
      "SELECT * FROM categorias WHERE id = $1",
      [categoria_id]
    );

    if (categoriaExiste.rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: "A categoria informada não existe." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = verificaCamposTransacao;
