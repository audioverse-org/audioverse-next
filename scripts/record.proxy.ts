import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs';
import { createServer } from 'http';
import httpProxy from 'http-proxy';
import path from 'path';
import stream from 'stream';

dotenv.config({ path: ['.env.local', '.env'] });

const target = process.env.NEXT_PUBLIC_API_URL?.replace(/\/graphql$/, '');
const folderPath = path.join(__dirname, '..', '__queries__');

fs.promises.mkdir(folderPath, { recursive: true }).catch(console.error);

if (!target) {
	console.error('No target URL provided');
	process.exit(1);
}

console.log('Proxying requests to', target);

const proxy = httpProxy.createProxyServer({
	target,
	changeOrigin: true,
});

proxy.on('error', (err, req, res) => {
	console.error(`Proxy error: ${err.message}`);
	if (!('writeHead' in res)) return;
	res.writeHead(500, { 'Content-Type': 'text/plain' });
	res.end('Proxy error. Please check logs.');
});

const server = createServer((req, res) => {
	switch (req.url) {
		case '/graphql': {
			const hash = crypto.createHash('sha256');
			const randomString = crypto.randomBytes(16).toString('hex');
			const tempFilePath = path.join(folderPath, `${randomString}.tmp`);
			const writable = fs.createWriteStream(tempFilePath);

			let hasErrorOccurred = false;

			writable.on('error', (err) => {
				if (!hasErrorOccurred) {
					hasErrorOccurred = true;
					console.error(err);
					res.writeHead(500, { 'Content-Type': 'text/plain' });
					res.end('Internal Server Error');
				}
			});

			writable.on('finish', () => {
				if (hasErrorOccurred) return;

				const finalHash = hash.digest('hex');
				const finalFilePath = path.join(folderPath, `${finalHash}.json`);

				fs.rename(tempFilePath, finalFilePath, (err) => {
					if (err) console.error(err);
				});
			});

			const transformStream = new stream.Transform({
				transform(chunk, encoding, callback) {
					hash.update(chunk);
					callback(null, chunk);
				},
			});

			req.pipe(transformStream).pipe(writable);
			``;

			proxy.web(req, res, {}, (e) => {
				console.error(`Proxy.web error: ${e.message}`);
			});

			break;
		}

		case '/healthcheck': {
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end('OK');

			break;
		}

		default: {
			console.log('Not found:', req.method, req.url);
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end('Not Found');
		}
	}
});

const port = 3001;

server.listen(port, () => {
	console.log(`Proxy server is running on http://localhost:${port}`);
});
