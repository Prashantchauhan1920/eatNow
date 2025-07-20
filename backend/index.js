const express = require('express');
const app = express();
const cors = require('cors');

const port = 5000;
const mongoDB = require('./db');
mongoDB();

app.use(cors());

// Immediately-invoked function to use `await` at the top level
(async () => {
  await mongoDB();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api', require('./Routes/CreateUser'));
  app.use('/api', require('./Routes/DisplayData'));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
