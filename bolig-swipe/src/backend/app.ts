import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
const port = 3000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {

    let filePath = path.join(__dirname, 'public', req.url === "/" || !req.url ? 'index.html' : req.url);
    let extName = path.extname(filePath);
    let contentType = 'text/html';

    switch (extName) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
    }

    res.writeHead(200, {'Content-Type' : contentType});
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

server.listen(port, (error?: Error) => {
    if (error) {
        console.log("Something went werong...", error);
    } else {
        console.log("Server is listening on port " + port);
    }
});

