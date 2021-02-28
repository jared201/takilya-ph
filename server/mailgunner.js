exports.sendMail = function (email, hash, callback)
{
    const mailgun = require('mailgun-js');
    const DOMAIN = 'sandbox54aa63f5f66a4a2090cd8787f0e8cea1.mailgun.org';
    const api_key = process.env.MAILGUN_API_KEY;
    const mg = mailgun({apiKey: api_key, domain: DOMAIN});
    const text = 'Welcome to Takilya!'
    const data = {
        from: 'Sales Team <sales@hueburg.com>',
        to: email,
        subject: '[Takilya] Account Activation',
        text: text
    };
    mg.messages().send(data, (error, body)=>{

        if (error) {
            console.log ('Error: ' + error);
            callback('Error: ' + error);
        } else {
            callback(body);
            console.log(body);
        }
    });
}
exports.sendNodeMail = function (email, hash, req, callback) {
  const nodemailer = require('nodemailer')
  const poolConfig = process.env.MAIL_URL
  const transporter = nodemailer.createTransport(poolConfig)
  const fullUrl = `${req.protocol}s://${req.get('host')}` + '/activate?email=' + email + '&hash=' + hash;
  const mailOptions = {}
  mailOptions.from = 'sales@hueburg.com'
  mailOptions.to = email
  mailOptions.subject = '[TAKILYA] Please activate your account'
  mailOptions.text = `${'Hello, \n\n' + 'Thank you for signing up! Please activate your account by clicking at the URL below! \n\n'}${fullUrl}`
  const info = transporter.sendMail(mailOptions)
  callback(`Message sent: ${info.messageId}`)
}