import Imap from 'imap';
import { inspect } from 'util';
import fs from 'fs';

const imap = new Imap({
  user: 'jjjh1983@naver.com',
  password: 'wjdwogus7*',
  host: 'imap.naver.com',
  port: 993,
  tls: true
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}


imap.once('ready', function () {
  openInbox(function (err, box) {
    if (err) throw err;
    imap.search([['HEADER', 'from', 'mail@kcredit.or.kr'], ['SINCE', 'Dec 16, 2022']], function (err, results) {

      if (err) throw err;
      var f = imap.fetch(results, { bodies: ''});



      f.on('message', function (msg, seqno) {
        console.log('Message #%d', seqno);
        var obj = {};
        var prefix = '(#' + seqno + ') ';
        obj.num = seqno;
        msg.on('body', function (stream, info) {

          if (info.which === 'TEXT') {
            console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
            var buffer = '', count = 0;
          }
          stream.on('data', function (chunk) {
            count += chunk.length;
            buffer += chunk.toString('utf8');
          });
          stream.once('end', function () {
            if (info.which === 'TEXT') {
              obj.body = buffer.toString('utf8');
            } else {
              console.log('info.which is not TEXT')
              obj.header = Imap.parseHeader(buffer);
            }
            console.log('obj', obj)


          });

          
          // console.log(prefix + 'Body');
          stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
        });
        msg.once('attributes', function (attrs) {
          console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
        });
        msg.once('end', function () {
          console.log(prefix + 'Finished');
        });
      });
      f.once('error', function (err) {
        console.log('Fetch error: ' + err);
      });
      f.once('end', function () {
        console.log('Done fetching all messages!');
        imap.end();
      });
    });
  });
});

imap.once('error', function (err) {
  console.log(err);
});

imap.once('end', function () {
  console.log('Connection ended');
});

imap.connect();