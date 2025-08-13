import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_IP = '192.168.68.80';
const server = http.createServer((req, res) => {
    const url = req.url || '/';
    if (url.startsWith('/user/')) {
        serveHTMLFile(res, 'user.html');
        return;
    }
    if (url.startsWith('/content/')) {
        serveHTMLFile(res, 'content.html');
        return;
    }
    let filePath = path.join(__dirname, req.url === "/" || !req.url ? 'index.html' : req.url);
    let extName = path.extname(filePath);
    let contentType = 'text/html';
    switch (extName) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
    }
    fs.readFile(filePath, (err, content) => {
        if (err) {
            serveHTMLFile(res, '404.html', 404);
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});
function serveHTMLFile(res, fileName, statusCode = 200) {
    const filePath = path.join(__dirname, 'public', fileName);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
        else {
            res.writeHead(statusCode, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
}
server.listen(port, LOCAL_IP, (error) => {
    if (error) {
        console.log("Something went werong...", error);
    }
    else {
        console.log("Server is listening on port " + port);
    }
});
