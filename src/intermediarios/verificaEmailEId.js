const pool = require("../conexao");

const verificaEmailEId = async (req, res, next) => {
    const { email } = req.body
    const { id } = req.usuario;

    const { rows: emailExiste } = await pool.query('SELECT id FROM usuarios WHERE email = $1 AND id != $2', [email, id]);

    if (emailExiste.length > 0) {
        return res.status(401).json({ mensagem: "O email já está em uso por outro usuário." });
    }
    next();
}


module.exports = verificaEmailEId;