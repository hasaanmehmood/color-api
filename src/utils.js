const fs = require('fs');
const path = require('path');
const os = require('os');


const getColor = () => {
  
  let color = process.env.DEFAULT_COLOR;
  const colorFilePath = process.env.COLOR_CONFIG_PATH;
  if (colorFilePath) {
    try {
      const colorFromFile = fs.readFileSync(path.resolve(colorFilePath), 'utf8');
      color = colorFromFile.trim();
    } catch (err) {
      console.error(`Error reading color from file: ${err.message}`);
    }
  }
  return color || 'blue';
};

const getHostname = () => os.hostname();


module.exports = { getColor,getHostname, };