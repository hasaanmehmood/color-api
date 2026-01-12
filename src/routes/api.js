const express = require('express');
const { getHostname } = require('../utils');
const { getColor, getColors , deleteColor, saveColor} = require('../db/color');

const apiRouter = express.Router();


apiRouter.get('/', async (req, res) => {
  const {format, colorKey} = req.query;  
  console.log(`colorKey: ${colorKey}`);
  const color = await getColor({key: colorKey});
  const hostname = getHostname();

  if (format === 'json') {
    return res.json({ 
      color,
      hostname,
     });
  } else {
    return res.send(`COLOR: ${color}\nHOSTNAME: ${hostname}`);
  }
});

apiRouter.get('/color', async (req, res) => {
    const colors =  await getColors();
    return res.send({data: colors});
});

apiRouter.get('/color/:key', async (req, res) => {
    const { key} = req.params;
    const color = await getColor({key, strict: true});
    if(!color) {
        return res.status(404).send('Color not found');
    } else {
        return res.send({ data: color});
    }


});

apiRouter.post('/color/:key', async (req, res) => {
    const { key} = req.params;
    const {value} = req.body;

    await saveColor({key, value});
    return res.status(201).send('Color saved',{data:{key, value}});
});

apiRouter.put('/color/:key', async (req, res) => {
    const { key} = req.params;
    const {value} = req.body;

    await saveColor({key, value});
    return res.status(200).send('Color updated');

});

apiRouter.delete('/color/:key', async (req, res) => {

    const { key} = req.params;
  

    await deleteColor({key});
    return res.status(204).send('Color deleted');
});


module.exports = apiRouter;