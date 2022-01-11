const app = require('express')();
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const dataPath = '/tmp/items.json';

app.post('/api/insertItem',jsonParser,async (req, res) => {
  let items = [];
  await fs.readFile(dataPath, {encoding: 'utf8'}, (err, data) => {
    if(err) {
      console.log(err);
      items = [];
    }
    else items = JSON.parse(data);
  })

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

  fs.writeFileSync(dataPath, JSON.stringify(items));

  res.status(200).json({
    meta: {
      data: 'Item inserted successfully',
    },
  });
});

app.get('/api/getItems',async (req, res) => {
  let items = [];
  await fs.readFile(dataPath, {encoding: 'utf8'}, (err, data) => {
    if(err) items = [];
    else items = JSON.parse(data);
  })
  res.status(200);
  res.json(items);
});

module.exports = app;
