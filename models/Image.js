const  mongoose = require('mongoose');
const { Schema } = mongoose;
const imageSchema = new Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
mongoose.model('image', imageSchema);