const http = require("http");

let user = [
  { id: 1, name: "srini" },
  { id: 2, name: "guru" },
];

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {

    const send = (status, data)=> {
        res.writeHead(status)
        res.end(JSON.stringify(data))
    }
    return send(200, user);
  }
});

server.listen(3000, () => console.log("running on 3000 server"));
