require('dotenv').config();
const emailsRouter = require('express').Router();
const nodemailer = require('nodemailer');
const { SENDER_EMAIL_ADDRESS, SENDER_EMAIL_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL_ADDRESS,
    pass: SENDER_EMAIL_PASSWORD,
  },
});

emailsRouter.post('/', (req, res) => {
  const { firstname, lastname, email, message, phone } = req.body;

  const mailOptionsHtml = {
    from: SENDER_EMAIL_ADDRESS,
    to: 'wcs.cfainterpro28@gmail.com',
    cc: email,
    subject: `test send email with Gmail from ${firstname} ${lastname} ${message} ${phone}`,
    html: '<h2>Test Send Mail</h2><br/><p>Test test and re-test....</p>',
  };
  console.log(SENDER_EMAIL_ADDRESS, SENDER_EMAIL_PASSWORD);

  

  transport.sendMail(mailOptionsHtml, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Email sent with success !!');
    }
  });
});

module.exports = emailsRouter;
