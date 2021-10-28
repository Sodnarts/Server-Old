const mongoose = require('mongoose');
const Project = mongoose.model('project');
const Translation = mongoose.model('translations');

module.exports = (app) => {
    app.get('/api/projects', async (req, res) => {
        const projects = await Project.find({}).select({ description: false, languages: false, translations: false, lastEditDate: false });
        console.log("GET /projects: -- ", projects)
        res.send(projects);
    });

    app.post('/api/projects/current', async (req, res) => {
        const project = await Project.find({ _id: req.body._id });
        console.log("POST /projects/current: -- ", project)
        res.send(project[0]);
    });

    app.post('/api/projects/new', async (req, res) => {
        const { title, description, languages, translations } = req.body;

        const newTranslations = []
        translations.map(t => {
            newTranslations.push(new Translation({strings: t.strings}));
        })

        const project = new Project({
            title,
            description,
            languages,
            translations: newTranslations,
            lastEditDate: Date.now(),
        });

        await project.save();
        res.send(project);
    });

    app.post('/api/projects/edit', async (req, res) => {
        const { title, description, languages, strings, lastEdited, _id } = req.body;
        
        const project = await Project.find({ _id });

        !!title ? project[0].title = title : undefined;
        !!description ? project[0].description = description : undefined;
        !!languages ? project[0].languages = languages : undefined;
        project[0].lastEditDate = Date.now();

        await project[0].save();
        res.send(project[0]);
    });

    app.post('/api/translations/new', async (req, res) => {
        const { translation, _id } = req.body;
        
        const newTranslation = new Translation({strings: translation.strings});

        const project = await Project.find({ _id });
        
        project[0].translations = [...project[0].translations, newTranslation]

        console.log("POST /translations/new: -- ", project)

        await project[0].save();
        res.send(project[0]);
    });

    app.post('/api/translations/edit', async (req, res) => {
        const { translation, _id } = req.body;
        
        const project = await Project.find({ _id });
        const tmpTranslation = project[0].translations.filter(t => {
            return t._id == translation._id;
        })

        tmpTranslation[0].strings = translation.strings;

        console.log("POST /translations/edit: -- ", project)

        await project[0].save();
        res.send(project[0]);
    });

    app.post('/api/translations/delete', async (req, res) => {
        const { _id, translationId } = req.body;
        
        const project = await Project.find({ _id });

        const tmpTranslations = project[0].translations.filter(t => {
            return t._id != translationId;
        })

        project[0].translations = tmpTranslations;
        
        console.log("POST /translations/delete: -- ", project)
        
        await project[0].save();
        res.send(project[0]);
    });

    app.post('/api/projects/delete', async (req, res) => {
        const project = await Project.deleteOne({ _id: req.body._id });

        const projects = await Recipe.find({});
        res.send(projects);
    });
};

