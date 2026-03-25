const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 9000;

const server = http.createServer((req, res) => {
  let filePath;

  if (req.url === '/') {
    filePath = path.join(__dirname, 'index.html');
  } else {
    filePath = path.join(__dirname, req.url);
  }

  const fileExtension = path.extname(filePath);
  let contentType = 'text/html';

  if (fileExtension === '.css') {
    contentType = 'text/css';
  } else if (fileExtension === '.js') {
    contentType = 'text/javascript';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err}`, 'utf-8');
      }
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data, 'utf-8');
  });
});

server.listen(PORT, () => {
  console.log(`
╔═════════════════════════════════════════════════════╗
║   Academic Publishing Platform - Frontend Server    ║
╠═════════════════════════════════════════════════════╣
║  Frontend running at: http://localhost:${PORT}
║  Open this in your browser to access the dApp
║  Make sure backend is running on http://localhost:5000
╚═════════════════════════════════════════════════════╝
  `);
});
