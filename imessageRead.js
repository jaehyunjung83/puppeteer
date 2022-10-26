const SQLiteMessagesDB = `${process.env.HOME}/Library/Messages/chat.db`
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(SQLiteMessagesDB)

var nowTime = new Date();
nowTime.setHours(nowTime.getHours() + 9);
const sentTimeISO = nowTime.toISOString().replace('T', ' ').substring(0, 19);
console.log("🚀 ~ file: imessageRead.js ~ line 9 ~ sentTimeISO", sentTimeISO)

let sql = `
    SELECT
        datetime (message.date / 1000000000 + strftime ("%s", "2001-01-01"), "unixepoch", "localtime") AS message_date,
        message.text
    FROM
        chat
        JOIN chat_message_join ON chat. "ROWID" = chat_message_join.chat_id
        JOIN message ON chat_message_join.message_id = message. "ROWID"
    WHERE
        chat_identifier = '+82220338500'
        and
        datetime (message.date / 1000000000 + strftime ("%s", "2001-01-01"), "unixepoch", "localtime") > '${sentTimeISO}'
    ORDER BY message_date DESC
    `;

let result = {}
const get = async () => {
    db.get(sql, [], (err, row) => {
        if (err) {
            throw err;
        }
        if (row) { return result = row, resultOut(result) }
        else { return setTimeout(() => { get(), console.log('다시') }, 1000) }
    })
    
};
get();
const resultOut = (resultoutreturn) => { console.log('resultoutreturn: ', resultoutreturn) }


// close the database connection
// db.close();