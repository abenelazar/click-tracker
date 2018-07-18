import { Router } from 'express';

export default ({ config, db }) => {
	let api = Router();

	api.get('/track/element/:name', (req, res) => {
		const { ip, hostname } = req
		const { name } = req.params;
		const values = [ip, hostname, name, req.headers['user-agent']]
		const query = 'INSERT INTO element_tracking(ip, host, element, user_agent, date) VALUES($1, $2, $3, $4, NOW())'
		db.query(query, values, (err, data) => {
			if (err) {
			  console.log(err.stack)
			  res.status(500)
			}else {
				res.send(data)
			}
		});
	});

	api.get('/track/link/:name', (req, res) => {
		const { ip, hostname } = req
		const { name } = req.params;
		const values = [ip, hostname, name, req.headers['user-agent']]
		const query = 'INSERT INTO link_tracking(ip, host, link, user_agent, date) VALUES($1, $2, $3, $4, NOW())'
		db.query(query, values, (err, data) => {
			if (err) {
			  console.log(err.stack)
			  res.status(500)
			}else {
				console.log(data)
				res.send(data)
			}
		});
	});

	api.get('/report/elements/', (_, res) => {
		const query = 'SELECT element as key, CAST(count(*) AS INTEGER) FROM element_tracking GROUP BY element WHERE DATE'
		db.query(query, (err, data) => {
			if (err) {
			  console.log(err.stack)
			  res.status(500)
			}else {
				res.send(data.rows);
			}
		});
	});

	api.get('/report/user_agent', (_, res) => {
		const query = `
			SELECT user_agent as key, CAST(count(*) AS INTEGER) FROM element_tracking GROUP BY ip
			UNION
			SELECT user_agenrt as key, CAST(count(*) AS INTEGER) FROM link_tracking GROUP BY ip
		`
		db.query(query, (err, data) => {
			if (err) {
			  console.log(err.stack)
			  res.status(500)
			}else {
				res.send(data.rows)
			}
		});
	});

	api.get('/report/ip_addresses', (_, res) => {
		const query = `
			SELECT ip as key, CAST(count(*) AS INTEGER) FROM element_tracking GROUP BY ip
			UNION
			SELECT ip as key, CAST(count(*) AS INTEGER) FROM link_tracking GROUP BY ip
		`
		db.query(query, (err, data) => {
			if (err) {
			  console.log(err.stack)
				res.status(500).send()
			}else {
				res.send(data.rows);
			}
		});
	});


	api.get('/report/links', (_, res) => {
	});

	api.get('/test/:date', (_, res) => {
		res.send(req.params.date)
	});

	return api;
}
