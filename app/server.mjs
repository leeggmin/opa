import { createServer } from 'node:http';

const server = createServer((request, response) => {
    if (request.url !== '/' && request.url !== '/health') {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'not found' }));
        return;
    }
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(request.url === '/health' ? { status: 'ok' } : {
        service: 'opa-lab',
        version: process.env.APP_VERSION || 'unknown',
        message: 'Deployed after OPA policy approval',
    }));
});

server.listen(8080, '0.0.0.0', () => console.log('OPA demo API listening on port 8080'));
process.on('SIGTERM', () => server.close());
process.on('SIGINT', () => server.close());