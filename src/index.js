const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const healthRouter = require('./routes/health');
const apiRouter = require('./routes/api');
const rootRouter = require('./routes/root');

const app = express();
const port = 80;

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Color API is listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {console.error('Could not connect to MongoDB...', err);
  });


const delay_startup = process.env.DELAY_STARTUP === 'true';
console.log(`Startup delay : ${delay_startup}`);



app.use(bodyParser.json());
app.use('/', healthRouter);
app.use('/api', apiRouter);
app.use('/', rootRouter);

if (delay_startup) {
  const start = Date.now();
  const delay = 60000;    
// purposely block the event loop for 60 seconds
  while (Date.now() - start < delay) {
    // Busy wait
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});