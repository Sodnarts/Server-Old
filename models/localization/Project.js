const mongoose = require('mongoose');
const { Schema } = mongoose;
const TranslationSchema = require('./Translations');

const projectSchema = new Schema({
    title: String,
    description: String,
    lastEditDate: Number,
    languages: [String],
    translations: [TranslationSchema],
});

mongoose.model('project', projectSchema);
