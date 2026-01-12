const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    key: String,
    value: String,
});
const Color =  mongoose.model('Color', colorSchema);

const saveColor = async (key, value) => {
    let color = await Color.findOne({key});

    if (color)
    {
        color.set({value});
    }
    else {
        color = new Color({key, value});
    }

    await color.save();
    
}

const deleteColor = async (key) => { await Color.deleteOne({key}); };


// new Color({ key: 'primary', value: '#FF0000' }).save();

const getColors = async () => Color.find();


const getColor = async ({key, strict = false}) => {

    let color = await Color.findOne({key});
    if(strict) {
        return color.value;
    }

    if(color) {
        return color.value ;
    }
    if(strict && !color) {
        return undefined
    }
    return process.env.DEFAULT_COLOR || 'blue';

};

module.exports = { getColors, getColor,saveColor, deleteColor };