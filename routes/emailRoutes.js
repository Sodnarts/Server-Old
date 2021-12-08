const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(keys.sendGridKey);

module.exports = (app) => {
    
    app.post('/api/email', async (req, res) => {
        console.log(req.body)
        const msg = {
            to: 'strandos.glenn@gmail.com',
            from: 'strandos.glenn@gmail.com',
            subject: req.body.subject,
            text: req.body.message,
            html: `<strong>From: ${req.body.email}</strong><br><br><p>${req.body.message}</p><br><p>Best regards,<br>${req.body.name}</p>`,
        }
        sgMail
            .send(msg)
            .then(() => {
            console.log('Email sent')
            })
            .catch((error) => {
            console.error(error)
            })

        res.redirect(keys.emailRedirectUrl)
    })
}