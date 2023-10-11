require("dotenv").config();
const pool = require("../conexao");

const detalharTransacao = async (req, res) => {
  const { id } = req.params;
  const idUsuarioLogado = req.usuario.id;

  if (isNaN(id)) {
    return res.status(400).json("O id da rota precisa ser um número!");
  }

  try {
    const { rows, rowCount } = await pool.query(
      "SELECT t.*, c.descricao AS categoria_nome FROM transacoes t JOIN categorias c ON t.categoria_id = c.id WHERE t.id = $1 AND t.usuario_id = $2",
      [id, idUsuarioLogado]
    );

    if (rowCount < 1) {
      return res.status(404).json({ mensagem: "Transação não encontrada!" });
    }

    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json("Erro interno do servidor!");
  }
};

const atualizarTransacao = async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const idUsuarioLogado = req.usuario.id;

  try {
    const { rowCount } = await pool.query(
      "select * from transacoes where id = $1 and usuario_id = $2",
      [id, idUsuarioLogado]
    );

    if (rowCount < 1) {
      return res.status(404).json({ mensagem: "Transação não encontrada!" });
    }

    const { rowCount: categoriaRowCount } = await pool.query(
      "SELECT * FROM categorias WHERE id = $1",
      [categoria_id]
    );

    if (categoriaRowCount < 1) {
      return res.status(404).json({ mensagem: "Categoria não encontrada!" });
    }

    await pool.query(
      "update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6 and usuario_id = $7",
      [descricao, valor, data, categoria_id, tipo, id, idUsuarioLogado]
    );

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json("Erro interno do servidor");
  }
};

const listaTransacao = async (req, res) => {
  const usuarioID = req.usuario.id;
  const { filtro } = req.query;

  try {
    let query = `
        SELECT t.*, c.descricao AS categoria_nome
        FROM transacoes t
        LEFT JOIN categorias c ON t.categoria_id = c.id
        WHERE t.usuario_id = $1
      `;
    const valores = [usuarioID];

    if (filtro && filtro.length > 0) {
      const filtrosMinusculos = filtro.map((categoria) =>
        categoria.toLowerCase()
      );
      query += `
          AND LOWER(c.descricao) = ANY($2::text[])
        `;
      valores.push(filtrosMinusculos);
    }

    const resultado = await pool.query(query, valores);

    return res.status(200).json(resultado.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const cadastraTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const usuarioID = req.usuario.id;

  try {
    const novaTransacao = await pool.query(
      `
            INSERT INTO transacoes (descricao, valor, data, categoria_id, tipo, usuario_id) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *, (SELECT descricao FROM categorias WHERE id = $4) AS categoria_nome;
            `,
      [descricao, valor, data, categoria_id, tipo, usuarioID]
    );

    return res.status(201).json(novaTransacao.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const deletaTransacao = async (req, res) => {
  const usuarioID = req.usuario.id;
  const transacaoID = req.params.id;

  try {
    const transacao = await pool.query(
      "SELECT * FROM transacoes WHERE id = $1 AND usuario_id = $2",
      [transacaoID, usuarioID]
    );

    if (transacao.rowCount === 0) {
      return res.status(404).json({
        mensagem: "Transação não encontrada ou não pertence ao usuário.",
      });
    }

    await pool.query("DELETE FROM transacoes WHERE id = $1", [transacaoID]);

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

const emiteExtrato = async (req, res) => {
  const usuarioID = req.usuario.id;

  try {
    const somaResultadoEntradas = await pool.query(
      "SELECT COALESCE(SUM(valor), 0) AS entrada_sum FROM transacoes WHERE usuario_id = $1 AND tipo = 'entrada'",
      [usuarioID]
    );

    const entradas = Number(somaResultadoEntradas.rows[0].entrada_sum);

    const somaResultadoSaidas = await pool.query(
      "SELECT COALESCE(SUM(valor), 0) AS saida_sum FROM transacoes WHERE usuario_id = $1 AND tipo = 'saida'",
      [usuarioID]
    );

    const saidas = Number(somaResultadoSaidas.rows[0].saida_sum);

    const extrato = {
      entrada: entradas,
      saida: saidas,
    };
    return res.status(200).json(extrato);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  cadastraTransacao,
  listaTransacao,
  deletaTransacao,
  emiteExtrato,
  detalharTransacao,
  atualizarTransacao,
};
