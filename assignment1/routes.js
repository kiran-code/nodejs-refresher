const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if(url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter user name</title></head>');
    res.write('<body>');
    res.write(`<form action="/create-user" method="POST"><input name="username" type="text"><button type="submit">Create User</button></form>`);
    res.write('</body>');
    res.write('</html>')  
    return res.end();
  }

  if(url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>List of Users</title></head>');
    res.write('<body>');
    res.write(`<ul><li>User1</li><li>User2</li><li>User3</li></ul>`);
    res.write('</body>');
    res.write('</html>')
    res.end();
  }

  if(url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
   });

   return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
   });
  }
}

module.exports = requestHandler;