import imaps from 'imap-simple';
import fs from 'fs';
import { simpleParser } from 'mailparser';
import _ from 'lodash';

(async() => {
var imapConfig = {
  imap: {
    user: 'jjjh1983@naver.com',
    password: 'wjdwogus7*',
    host: 'imap.naver.com',
    port: 993,
    tls: true
  }
};

console.log('imap 시작')

const connection = await imaps.connect(imapConfig)

const imapConnect = async() => {
  
var now = new Date();
var timeAgo = new Date();
timeAgo.setMinutes(timeAgo.getMinutes() - 280);

await connection.openBox('INBOX')
          
var searchCriteria = [
  ['NEW'],
  ['HEADER', 'from', 'jjjh1983@reply.r-e.kr'],
  ['SINCE', now.toISOString()], // 날짜 기준만 적용 가능
];
var fetchOptions = { bodies: ['HEADER', 'TEXT', ''] };
  return await connection.search(searchCriteria, fetchOptions,)
};

const untilNewMailConfirm = async() => {
  while (true) {
    const searchMail = await imapConnect();

    // imap.seach returns an array
    if (searchMail.length > 0) {
      //  NEW Flag로 메시지가 1개라도 있으면 그 uid 읽음 처리 addFlag Callback Sent
      await connection.addFlags(searchMail[0].attributes.uid, ['\\SEEN'], (err) => { if (err) {console.log('addFlage Err', err)}});
        // NEW Flag mail 을 parse Function으로 보내고 untilNewMailConfirm function 종료
        return newMailParse(searchMail[0]);
    }
    // Wait 1 second before checking again
    console.log('NEW 메시지 올때까지 1초마다 sleep and recursively do while function')
    await sleep(1000);
  }
};

// Sleep utility function
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const newMailParse = async(newMail) => {
  

  const fullBody = _.find(newMail.parts, {which: ''})

  const parseNewMailBody = await simpleParser(fullBody.body);
  // match는 array 반환
  const authNumber = parseNewMailBody.text.match(/\b\d{6}\b/g, '')[0];
    return authNumber
};

try {
const authNumberOut = await untilNewMailConfirm();
console.log("🚀 ~ file: simpleIMAP.js:73 ~ authNumberOut", authNumberOut)

  return authNumberOut
} catch {
  console.log('resursive failed')
  }






  // const connection = await imaps.connect(imapConfig)
  
  // var now = new Date();
  // var timeAgo = new Date();
  // timeAgo.setMinutes(timeAgo.getMinutes() - 280);

  // await connection.openBox('INBOX')
            
  // var searchCriteria = [
  //   ['HEADER', 'from', 'mail@kcredit.or.kr'],
  //   ['SINCE', now.toISOString()], // 날짜 기준만 적용 가능
  // ];
  // var fetchOptions = { bodies: ['HEADER', 'TEXT', ''], };


  // const messages = await connection.search(searchCriteria, fetchOptions)
  
  // console.log(`whole messages length: ${messages.length}`)

  // const fullBody = _.find(messages[0].parts, {which: ''})

  // const mailBodyParse = await simpleParser(fullBody.body)

  // const authNumber = mailBodyParse.text?.match(/\b\d{6}\b/g, '')[0];
  // console.log("🚀 ~ file: imapSimple.js:47 ~ authNumber", authNumber)
  
  // await connection.end();
  // console.log('connection end')








  // const authMessage = await messages.map(async(item) => {
  //   console.log('messages map')
    
  //   var all = _.find(item.parts, { "which": "" })
  //   var id = item.attributes.uid;
  //   var idHeader = "Imap-Id: " + id + "\r\n";
  //   const itemParse = await simpleParser(idHeader + all.body);
    
  //   return itemParse.text?.match(/\b\d{6}\b/g, '')[0];
  // });
  
  
  // const authMessageToString = authMessage.toString();
  
  

  // const mailWithoutCallback = await simpleParser(authMessageToString)
  
  // const authNumberReg = mailWithoutCallback.text?.match(/\b\d{6}\b/g, '')[0]
  // console.log("🚀 ~ file: imapSimple.js:67 ~ authNumberReg", authNumberReg)



  // simpleParser(authMessageToString, (err, mail) => {
  //   console.log('messages Parse 시작')
  //   count++
  //   // access to the whole mail object
  //   if (mail.date > timeAgo) {
  //     console.log(`${count} -> ${timeAgo} received mail was found`)
  //     console.log(mail.date) + console.log(mail.subject)
  //     const body = mail.date + mail.html
  //     // fs.writeFile('./nodeimap_' + id + '.html', body, () => console.log())
      
  //     console.log('RegEx: ', mail.text?.match(/\b\d{6}\b/g, '')[0])
  //     const authResult = mail.text.match(/\s*(\d{6})\s*/g);
      
  //     emailAuthNumber = authResult[0].trim();
  //     return mail.text?.match(/\b\d{6}\b/g, '')[0] + connection.end() + console.log('connection end with success');
      
  //   } else {
  //     console.log(`${count} -> ${timeAgo} received mail was not found`)
  //     connection.end()
  //     console.log('connection end with none')
  //   }
  // })



})();