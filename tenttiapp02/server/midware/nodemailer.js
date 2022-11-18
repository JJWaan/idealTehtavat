const nodemailer = require('nodemailer');

// mailer

// set transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yosowananen@gmail.com',
        pass: 'gicfwekcivtdvrje' // google generated pw
    }
});

const mailingList = [
    "j.waananen@protonmail.com",
    "juvuorin.gmail.com"
];

const emailSubject = "Here goes..";
const emailText = "Hello, this is a test if string-type goes thru! Have a nice day.";

const mailOptions = {
    from: 'yosowananen@gmail.com',
    to: mailingList,
    subject: emailSubject,
    text: emailText
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) { console.log(error); }
    else { console.log('Email sent, info response:' + info.response) }
});

// module.exports = sendEmail;