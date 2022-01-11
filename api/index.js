const app = require('express')();
const items = require('./items.json');

app.get('/api/insertItem', (req, res) => {
  res.status(200);
  res.json(items);
});

app.get('/api', (req,res) => {
  res.send('Hello');
})

module.exports = app;
