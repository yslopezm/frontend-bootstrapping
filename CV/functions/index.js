
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'account@gmail.com',
        pass: 'pass'
    }
});

/**
* Something was addedd to the DB  cloud function
*/
exports.contactMail = functions.firestore.document('contact/{contactId}').onCreate(
    (snap, context) => {
        const email = snap.data().email;
        const name = snap.data().name;       
        console.log(`${name}, ${email}`);
        return sendContactMail(email,name);
    }
);

function sendContactMail(email, name){
    return transporter.sendMail({
        from: 'Yeny Lopez<yenylm14@gmail.com>', 
        to: email,
        subject: `test ${name}`,
        html: `<p>Hola funciona</p>`
    }).then(r=>r)
    .catch(e=>e);    
};