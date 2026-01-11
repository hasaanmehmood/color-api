const express = require('express');

const healthRouter = express.Router();
const fail_liveness = process.env.FAIL_LIVENESS === 'true';
const fail_readiness = process.env.FAIL_READINESS === 'true' ? Math.random() < 0.5 : false;

console.log(`Liveness failure : ${fail_liveness}`);
console.log(`Readiness failure : ${fail_readiness}`);

healthRouter.get('/ready', (req, res) => {
  if (fail_readiness) {
    return res.status(500).send('Not Ready');
  }
  return res.status(200).send('Ok');
});

healthRouter.get('/up', (req, res) => {
  res.status(200).send('Ok');
});


healthRouter.get('/health', (req, res) => {
  if (fail_liveness) {
    return res.status(503).send('Not Healthy');
  }
  return res.status(200).send('Ok');
});

module.exports = healthRouter;