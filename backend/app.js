const express = require('express');
const bodyParser = require('body-parser');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

const app = express();
const favorite = require('./routes/favorite');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use('/api/favorite', favorite);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
    return;
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});

module.exports = app;
