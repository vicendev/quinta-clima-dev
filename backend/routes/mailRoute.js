const express = require('express');
const router = express.Router();

require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;

router.post("", (req, res, next) => {
    try{
        let user = req.body;
        sendMail(user, info => {
            log("The mail it's sended successfully");
            res.send(info);
        })
    } catch (error) {
        console.error(error)
    }
})

async function sendMail(user, callback) {
    let transporter = nodemailer.createTransport({
        port: process.env.PORTSMTP,
        host: process.env.HOST,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let mailOption = {
        from: user.data.email,
        to: process.env.EMAIL,
        //cc: process.env.CC,
        subject: `${user.data.name} ${user.data.surname}, ${user.data.works}`,
        html: `<h3>Tipo de trabajo <i>${user.data.works}</i></h3><br>
        <h4>${user.data.name} ${user.data.surname}, escribe:<br><br>
        <p>${user.data.message}</p><br>
        <p>Enviado el día: ${user.data.date}`
    };

    let info = await transporter.sendMail(mailOption);

    callback(info);
}

module.exports = router;