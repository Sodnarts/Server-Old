const mongoose = require('mongoose');
const { Schema } = mongoose;


const recipeSchema = new Schema({
    ingredients: [{ ingredient: String, volume: String }],
    instructions: { titles: [{ key: String, value: String }], descriptions: [{ key: String, value: String }] },
    name: { type: String, default: "A Dish" },
    prepTimeMax: { type: String, default: 0 },
    prepTimeMin: { type: String, default: 0 },
    portions: { type: String, default: 0 },
    type: { type: String, default: 'Dinner' },
    timeCreated: Number,
    image: { type: String, default: null },
});

mongoose.model('recipes', recipeSchema);
