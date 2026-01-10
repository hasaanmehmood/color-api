const express = require('express');
const os = require('os');
const app = express();
const port = 80;
const color = "blue";
const hostname = os.hostname();

app.get('/', (req, res) => {
  res.send(`<h1 style="color: ${color};">Hello World!</h1>
<h2>Hostname: ${os.hostname()}</h2>`);
});

app.get('/api', (req, res) => {
  const format = req.query.format;  // localhost/api?format=json
  if (format === 'json') {
    return res.json({ 
      color,
      hostname
     });
  } else {
    return res.send(`COLOR: ${color}\nHOSTNAME: ${hostname}`);
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});