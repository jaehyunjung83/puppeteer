import imaps from 'imap-simple';
import fs from 'fs';
import { simpleParser } from 'mailparser';
import _ from 'lodash';


var imapConfig = {
  imap: {
    user: 'jjjh1983@naver.com',
    password: 'wjdwogus7*',
    host: 'imap.naver.com',
    port: 993,
    tls: true
  }
};

imaps
  .connect(imapConfig)
  .then((connection) => {
    var now = new Date();
    var timeAgo = new Date();
    timeAgo.setMinutes(timeAgo.getMinutes() - 3);

    return connection.openBox('INBOX')
      .then(() => {
        var searchCriteria = [
          ['HEADER', 'from', 'jjjh1983@naver.com'],
          ['SINCE', now.toISOString()], // 날짜 기준만 적용 가능
        ];
        var fetchOptions = { bodies: ['HEADER', 'TEXT', ''], };
        return connection
          .search(searchCriteria, fetchOptions)
          .then((messages) => {
            console.log(`whole messages length: ${messages.length}`)
            var count = 0;
            messages.forEach((item) => {
              
              var all = _.find(item.parts, { "which": "" })
              var id = item.attributes.uid;
              var idHeader = "Imap-Id: " + id + "\r\n";
              simpleParser(idHeader + all.body, (err, mail) => {
                count++
                // access to the whole mail object
                if (mail.date > timeAgo) {
                  console.log(`${count} -> ${timeAgo} received mail was found`)
                  console.log(mail.date) + console.log(mail.subject)
                  const body = mail.date + mail.html
                  fs.writeFile('./nodeimap_' + id + '.html', body, () => console.log())
                  
                  console.log('RegEx: ', mail.text?.match(/\b\d{6}\b/g, '')[0])
                } else {
                  console.log(`${count} -> ${timeAgo} received mail was not found`)
                }
              });
            });
          })
          .then(() => connection.end());
      });
  });