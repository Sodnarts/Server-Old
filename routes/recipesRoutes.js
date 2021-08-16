const mongoose = require('mongoose');

const Recipe = mongoose.model('recipes');

module.exports = (app) => {
    app.get('/api/recipes', async (req, res) => {
        const recipes = await Recipe.find({});

        res.send(recipes);
    });

    app.post('/api/recipes/current', async (req, res) => {
        const recipe = await Recipe.find({ _id: req.body._id });

        res.send(recipe[0]);
    });

    app.post('/api/recipes/new', async (req, res) => {
        const { ingredients, instructions, name, prepTimeMax, prepTimeMin, portions, type, timeCreated, image } = req.body.recipe;

        console.log(req.body);
        const recipe = new Recipe({
            ingredients,
            instructions,
            name,
            prepTimeMax,
            prepTimeMin,
            portions,
            type,
            timeCreated,
            image
        });

        await recipe.save();
        const recipes = await Recipe.find({});
        res.send(recipes);
    });

    app.post('/api/recipes/edit', async (req, res) => {
        const { ingredients, instructions, name, prepTimeMax, prepTimeMin, portions, type, timeCreated, image } = req.body.recipe;
        const recipe = await Recipe.find({ _id: req.body.recipe._id });

        console.log("RECIPE12 ", recipe[0], req.body.recipe)
        recipe[0].ingredients = ingredients;
        recipe[0].instructions = instructions;
        recipe[0].name = name;
        recipe[0].prepTimeMax = prepTimeMax;
        recipe[0].prepTimeMin = prepTimeMin;
        recipe[0].portions = portions
        recipe[0].type = type;
        recipe[0].timeCreated = timeCreated;
        recipe[0].image = image;

        console.log(recipe[0])
        await recipe[0].save();
        const recipes = await Recipe.find({});
        res.send(recipes);
    });

    app.post('/api/recipes/delete', async (req, res) => {
        const recipe = await Recipe.deleteOne({ _id: req.body._id });

        const recipes = await Recipe.find({});
        res.send(recipes);
    });
};

