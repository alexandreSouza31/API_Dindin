require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST_CONEXAO,
  port: process.env.PORT_CONEXAO,
  user: process.env.USER_CONEXAO,
  password: process.env.PASSWORD_CONEXAO,
  database: process.env.DATABASE_CONEXAO,
});

module.exports = pool;
