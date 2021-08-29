const mongoose = require('mongoose');
const multer = require('multer');
const Recipe = mongoose.model('recipes');
const Image = mongoose.model('image');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

module.exports = (app) => {
    app.get('/api/recipes', async (req, res) => {
        const recipes = await Recipe.find({});

        res.send(recipes);
    });

    app.post('/api/recipes/current', async (req, res) => {
        const recipe = await Recipe.find({ _id: req.body._id });

        res.send(recipe[0]);
    });

    app.post('/api/recipes/new', upload.single('image'), async (req, res) => {
       
        const json = JSON.parse(req.body.recipe)
        const { ingredients, instructions, subCategories, name, prepTimeMax, prepTimeMin, portions, type, timeCreated } = json;
        
        let image = null
        if (req.file) {
            image = new Image({
                img: {
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            });
        }

        const recipe = new Recipe({
            ingredients,
            instructions,
            subCategories,
            name,
            prepTimeMax,
            prepTimeMin,
            portions,
            type,
            timeCreated,
            image: image
        });
        await recipe.save();
        const recipes = await Recipe.find({});
        res.send(recipes);
    });

    app.post('/api/recipes/edit', upload.single('image'), async (req, res) => {
        console.log("BODY: ",req.body);
        const json = JSON.parse(req.body.recipe)
        const { ingredients, instructions, subCategories, name, prepTimeMax, prepTimeMin, portions, type, timeCreated, _id } = json;
        
        const recipe = await Recipe.find({ _id });

        let image = null
        if (req.file) {
            image = new Image({
                img: {
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            });
        }

        recipe[0].ingredients = ingredients;
        recipe[0].instructions = instructions;
        recipe[0].subCategories = subCategories;
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

