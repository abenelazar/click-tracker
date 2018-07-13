import { Router } from 'express';
import async from 'async'
import redis from 'redis';

console.info(process.env)
console.info(process.env)

const client = redis.createClient(6379, 'redis');

export default ({ config, db }) => {
	let api = Router();

	api.get('/track/element/:name', (req, res) => {
		const { ip, hostname } = req
		const { name } = req.params;
		const multi = client.multi();
		multi.incr(`HOST::${hostname}`, redis.print);
		multi.incr(`IP::${ip}`, redis.print);
		multi.incr(`ELEM::${name}`, redis.print);
		multi.incr(`AGENT::${req.headers['user-agent']}`, redis.print)
		multi.exec((err, _) => {
			if (err) {
				console.error(err);
				res.status(500).send('ERROR: Redis Error')
			}
		});
	});

	api.get('/track/link/:name', (req, res) => {
		const { ip, hostname } = req
		const { name } = req.params;
		const multi = client.multi();

		multi.incr(`HOST::${hostname}`, redis.print);
		multi.incr(`IP::${ip}`, redis.print);
		multi.incr(`LINK::${name}`, redis.print);
		multi.incr(`AGENT::${req.headers['user-agent']}`, redis.print)
		multi.exec((err, _) => {
			if (err) {
				console.error(err);
				res.status(500).send('ERROR: Redis Error')
			}
		});
	});

	api.get('/report/elements', (_, res) => {
		client.keys("ELEM::*", (_, keys) => {
			client.mget(keys, (_, pairs) => {
				res.send(keys.map((key, i) => {
					return {
						'key': key.split('ELEM::')[1],
						'count': parseInt(pairs[i])
					}
				}));
			})
		})
	});

	api.get('/report/user_agent', (_, res) => {
		client.keys("AGENT::*", (_, keys) => {
			client.mget(keys, (_, pairs) => {
				res.send(keys.map((key, i) => {
					return {
						'key': key.split('AGENT::')[1],
						'count': parseInt(pairs[i])
					}
				}));
			})
		})
	});

	api.get('/report/ip_addresses', (_, res) => {
		client.keys("IP::*", (_, keys) => {
			client.mget(keys, (_, pairs) => {
				res.send(keys.map((key, i) => {
					return {
						'key': key.split('IP::')[1],
						'count': parseInt(pairs[i])
					}
				}));
			})
		})
	});


	api.get('/report/links', (_, res) => {
		client.keys("LINK::*", (_, keys) => {
			client.mget(keys, (_, pairs) => {
				res.send(keys.map((key, i) => {
					return {
						'key': key.split('LINK::')[1],
						'count': parseInt(pairs[i])
					}
				}));
			})
		})
	});

	api.get('/report/ip_addresses', (_, res) => {
		client.keys("IP::*", (_, keys) => {
			client.mget(keys, (_, pairs) => {
				res.send(keys.map((key, i) => {
					return {
						'key': key.split('IP::')[1],
						'count': parseInt(pairs[i])
					}
				}));
			})
		})
	});

	return api;
}
