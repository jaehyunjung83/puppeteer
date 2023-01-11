import Imap from 'imap';
import { inspect } from 'util';
import fs from 'fs';
import { MailParser } from 'mailparser';


export var OBJ = {};


const imap = new Imap({
  user: 'jjjh1983@naver.com',
  password: 'wjdwogus7*',
  host: 'imap.naver.com',
  port: 993,
  tls: true
});
const openInbox = (cb) => {
  imap.openBox('INBOX', true, cb);
}


imap.once('ready', () => {
  openInbox((err, box) => {
    if (err) throw err;
    imap.search(
      [
        ['HEADER', 'from', 'REPLY TEAM.'],
        ['SINCE', 'Jan 2, 2023']
      ], (err, results) => {
      if (err) throw err;

      var f = imap.fetch(results, { bodies: ''});
      f.on('message', (msg, seqno) => {
        console.log('Message #%d', seqno);
        
        var prefix = '(#' + seqno + ') ';
        OBJ.num = seqno;


        var parser = new MailParser();
        parser.on('data', data => {
          
          // console.log('parser message 본문: ', data.text);
          OBJ.body = data.text
          console.log('parsed OBJ: ', OBJ)
        });




        msg.on('body', (stream, info) => {

          if (info.which === 'TEXT') {
            console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
            var buffer = '', count = 0;
          }
          stream.on('data', (chunk) => {
            count += chunk.length;
            buffer += chunk.toString('utf8');
            parser.write(buffer)
          });
          stream.once('end', () => {
            if (info.which === 'TEXT') {
              OBJ.body = buffer.toString('utf8');
            } else {
              console.log('info.which is not TEXT')
              OBJ.header = Imap.parseHeader(buffer);
              
            }
            // console.log('OBJ', OBJ)
            parser.end()

          });

          
          // console.log(prefix + 'Body');
          stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
          
        });
        msg.once('attributes', (attrs) => {
          console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        });
        msg.once('end', () => {
          console.log(prefix + 'Finished');
        });



      });
      f.once('error', (err) => {
        console.log('Fetch error: ' + err);
      });
      f.once('end', () => {
        console.log('Done fetching all messages!');
        imap.end();
      });
    });
  });
});

imap.once('error', (err) => {
  console.log(err);
});

imap.once('end', () => {
  console.log('Connection ended');
});

imap.connect();

