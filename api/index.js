const app = require('express')();
const items = require('items.json');

app.post('/api/insertItem', (req, res) => {
  res.status(200);
  res.json(items);
});

module.exports = app;
