const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID: String,
    googleName: String,
    credits: { type: Number, default: 0 },
    theme: { type: String, default: 'blue' },
    language: { type: String, default: 'en' },
    address: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    phoneNo: { type: String, default: '' },
    city: { type: String, default: '' }
});

mongoose.model('user', userSchema);
