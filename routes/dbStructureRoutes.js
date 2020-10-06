const mongoose = require('mongoose');
const User = mongoose.model('user');
const Survey = mongoose.model('surveys');
const Recipient = mongoose.model('recipients');

module.exports = (app) => {
    app.get('/api/db-structure', async (req, res) => {
        const recipientStructure = [{ email: 'test@test.mail' }];

        const user = new User();
        const recipient = new Recipient();
        const survey = new Survey();
        const survey2 = new Survey();

        recipient.email = 'test@test.mail';
        survey2.recipients = recipientStructure;
        survey2.lastResponded = '2019-12-05T19:33:01.921+00:00';

        const response = {
            schemas: [
                {
                    schemaName: 'A Schema',
                    tables: [
                        {
                            name: 'Recipient',
                            columns: [recipient],
                        },
                        {
                            name: 'Survey',
                            columns: [survey, survey2],
                        },
                        {
                            name: 'User',
                            columns: [user],
                        },
                    ],
                },
            ],
        };

        res.send(response);
    });
};
