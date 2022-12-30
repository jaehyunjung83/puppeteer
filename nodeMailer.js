import fs from 'fs';
import nodemailer from "nodemailer";

var FROM_ADDRESS = 'jjjh1983@naver.com';
var TO_ADDRESS = 'jjjh1983@reply.r-e.kr';


const html = fs.readFileSync('nodeMailerTemplate.html', { encoding: 'UTF-8' });

var transporter = nodemailer.createTransport(
    {
        service: "Naver",
        auth: {
            user: FROM_ADDRESS,
            pass: "wjdwogus7*"
        }
    }
);

var mailOptions = {
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    replyTo: 'REPLY',
    subject: 'nodeMailer Template',
    html: html
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Email Sent: ' + info.response);
    }
});