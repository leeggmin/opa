import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const staticRoot = process.env.STATIC_DIR ? resolve(process.env.STATIC_DIR) : null;
const contentTypes = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
    '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
};

const server = createServer(async (request, response) => {
    const metadata = {
        service: 'opa-lab',
        version: process.env.APP_VERSION || 'unknown',
        message: 'Frontend deployed after OPA package and Docker policy approval',
    };
    if (request.url === '/health' || request.url === '/api/info' || (!staticRoot && request.url === '/')) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(request.url === '/health' ? { status: 'ok' } : metadata));
        return;
    }
    if (staticRoot) {
        try {
            const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
            const file = resolve(staticRoot, `.${pathname === '/' ? '/index.html' : pathname}`);
            if (!file.startsWith(`${staticRoot}${sep}`)) {
                throw new Error('Invalid asset path');
            }
            let content;
            let extension = extname(file);
            try {
                content = await readFile(file);
            } catch (error) {
                if (error.code !== 'ENOENT' || extension || pathname.startsWith('/api/')) {
                    throw error;
                }
                extension = '.html';
                content = await readFile(resolve(staticRoot, 'index.html'));
            }
            response.writeHead(200, { 'Content-Type': contentTypes[extension] || 'application/octet-stream' });
            response.end(content);
            return;
        } catch {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Asset not found; backend APIs are not included in this lab.' }));
            return;
        }
    }
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'not found' }));
});

server.listen(8080, '0.0.0.0', () => console.log('OPA demo API listening on port 8080'));
process.on('SIGTERM', () => server.close());
process.on('SIGINT', () => server.close());