const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const root = path.resolve(__dirname);
const configPath = path.join(root, "config.js");
const mime = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const apiKey = process.env.OPENWEATHER_API_KEY || "";
const configContents = `window.__APP_CONFIG__ = ${JSON.stringify({ apiKey })};\n`;

if (!apiKey) {
  console.warn("Warning: OPENWEATHER_API_KEY not set. Weather requests will fail until it is configured.");
}

// Write a tiny config file the client can read without hard-coding the key.
fs.writeFileSync(configPath, configContents, "utf8");

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const target = urlPath === "/" ? "/index.html" : urlPath;
  const safePath = path.normalize(target).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = path.join(root, safePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = mime[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
