const mongoose = require('mongoose');
const { Schema } = mongoose;

const translationSchema = new Schema({
    strings: [String],
});

mongoose.model('translations', translationSchema);
module.exports = translationSchema;
