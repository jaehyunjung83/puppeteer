const SQLiteMessagesDB = `${process.env.HOME}/Library/Messages/chat.db`
// const sqlite3 = require('sqlite3').verbose()
import verbose from 'sqlite3';
const sqlite3 = verbose;

const db = new sqlite3.Database(SQLiteMessagesDB)

let sql = `
    SELECT
        *
    FROM
        chat
    WHERE
        chat_identifier = '+821022217500'
    `;

let result = {}
const get = async () => {
    db.all(sql, [], (err, row) => {      
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