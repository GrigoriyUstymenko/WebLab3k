const app = require('express')();
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.post('/api/insertItem',jsonParser, (req, res) => {
  const items = require('../tmp/items.json');

  if (!req.body.title || !req.body.content) {
    res.status(400).json({
      errors: [
        {
          id: Date.now(),
          status: '400',
          title: 'Bad request',
          detail: 'required fields must not be empty',
        },
      ],
    });
    return;
  }

  items.push({
    title: req.body.title,
    content: req.body.content
  })

  fs.writeFileSync('../tmp/items.json', JSON.stringify(items));

  res.status(200).json({
    meta: {
      data: 'Item inserted successfully',
    },
  });
});

app.get('/api/getItems', (req, res) => {
  const items = require('../tmp/items.json');
  res.status(200);
  res.json(items);
});

module.exports = app;
