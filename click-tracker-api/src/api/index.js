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
		console.log('sup')
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

	api.get('/report/elements', (_, res) => {
		const query = 'SELECT element as key, CAST(count(*) AS INTEGER) FROM element_tracking GROUP BY element ORDER BY element'
		const values = 
		db.query(query, values, (err, data) => {
			if (err) {
			  console.log(err.stack)
			  res.status(500)
			}else {
				res.send(data.rows);
			}
		});
	});

	api.get('/report/elements/:start/:stop', (req, res) => {
		const query = `
			SELECT element as key, CAST(count(*) AS INTEGER)
			FROM element_tracking
			WHERE DATE >= $1 AND DATE <= $2
			GROUP BY element
			ORDER BY element
		`
		const values = [req.params.start, req.params.stop];
		db.query(query, values, (err, data) => {
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
		SELECT user_agent as key, CAST(sum(count) AS INTEGER) as count
		FROM
			((SELECT user_agent, count(*) FROM link_tracking
			GROUP BY user_agent
			)
			union
			(SELECT user_agent, count(*) FROM element_tracking
			GROUP BY user_agent
			)) _group
		GROUP BY user_agent
		ORDER BY user_agent
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



	api.get('/report/user_agent/:start/:stop', (req, res) => {
		const query = `
			SELECT user_agent as key, CAST(sum(count) AS INTEGER) as count
			FROM
				((SELECT user_agent, count(*) FROM link_tracking
				WHERE DATE >= $1 AND DATE <= $2
				GROUP BY user_agent
				)
				union
				(SELECT user_agent, count(*) FROM element_tracking
				WHERE DATE >= $1 AND DATE <= $2
				GROUP BY user_agent
				)) _group
			GROUP BY user_agent
			ORDER BY user_agent
		`
	const values = [req.params.start, req.params.stop];
	db.query(query, values, (err, data) => {
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
			SELECT ip as key, CAST(sum(count) AS INTEGER) as count
			FROM
				((SELECT ip, count(*) FROM link_tracking
				GROUP BY ip
				)
				union
				(SELECT ip, count(*) FROM element_tracking
				GROUP BY ip
				)) _group
			GROUP BY ip
			ORDER BY ip
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
		
	api.get('/report/ip_addresses/:start/:stop', (req, res) => {
		const query = `
			SELECT ip as key, CAST(count(*) AS INTEGER)
			FROM link_tracking
			WHERE DATE >= $1 AND DATE <= $2
			GROUP BY ip
			ORDER BY ip
		`
		const values = [req.params.start, req.params.stop];
		db.query(query, values, (err, data) => {
			if (err) {
			  console.log(err.stack)
				res.status(500).send()
			}else {
				res.send(data.rows);
			}
		});
	});

	api.get('/report/links', (_, res) => {
		const query = 'SELECT link as key, CAST(count(*) AS INTEGER) FROM link_tracking GROUP BY link ORDER BY link'
		db.query(query, (err, data) => {
			if (err) {
			  console.log(err.stack)
				res.status(500).send()
			}else {
				res.send(data.rows);
			}
		});
	});

	
	api.get('/report/links/:start/:stop', (req, res) => {
		const query = `
			SELECT link as key, CAST(count(*) AS INTEGER)
			FROM link_tracking
			WHERE DATE >= $1 AND DATE <= $2
			GROUP BY link
			ORDER BY link
		`
		const values = [req.params.start, req.params.stop];
		db.query(query, values, (err, data) => {
			if (err) {
			  console.log(err.stack)
				res.status(500).send()
			}else {
				res.send(data.rows);
			}
		});
	});
	
	return api;
}
