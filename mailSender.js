import fs from 'fs';
import nodemailer from "nodemailer";
import cheerio from 'cheerio';


const FROM_ADDRESS = 'jjjh1983@naver.com';
const TO_ADDRESS = 'jjjh1983@gmail.com';

const mailTo = '김갑수'

const html = fs.readFileSync('/Users/hyun_M1/Documents/nodeJS/Puppeteer/puppeteer/template2/index.html', { encoding: 'UTF-8' });

const $ = cheerio.load(html);

$('body').find($('#name')).text(mailTo).html()

const changedHtml = $.html()



var transporter = nodemailer.createTransport(
    {
        service: "naver",
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
    html: changedHtml
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Email Sent: ' + info.response);
    }
});

export default TO_ADDRESS