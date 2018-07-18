const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres', //env var: PGUSER
    password: 'password', //env var: PGPASSWORD
    host: 'db', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
  });

module.exports = {
	query: (text, params, callback) => {
		return pool.query(text, params, callback)
	}
}