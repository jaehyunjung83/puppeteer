const SQLiteMessagesDB = `${process.env.HOME}/Library/Messages/chat.db`
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(SQLiteMessagesDB)
var nowTime = new Date();
nowTime.setHours(nowTime.getHours() + 9);
const sentTimeISO = nowTime.toISOString().replace('T', ' ').substring(0, 19);
console.log("🚀 ~ file: imessageDB.js ~ line 11 ~ sentTimeISO", sentTimeISO)

let lastmessage = {};
let count = 0;
const messageDB = async () => {
	const messageResult = new Promise((resolve) => {
		db.serialize(() => {
			console.log('serilalize start')
			return db.each(
				`
					SELECT
						datetime (message.date / 1000000000 + strftime ("%s", "2001-01-01"), "unixepoch", "localtime") AS message_date,
						message.text
					FROM
						chat
						JOIN chat_message_join ON chat. "ROWID" = chat_message_join.chat_id
						JOIN message ON chat_message_join.message_id = message. "ROWID"
					WHERE
						chat_identifier = '+82220338500'
					ORDER BY message_date DESC LIMIT 1
	`, (err, row) => {
				if (err) {
					console.error('err.message: ', err.message)
				}
				console.log('row', row)
				return resolve(row);
			},

			);
		});

	});






	await messageResult
		.then((res) => {
			lastmessage = res;
			console.log('lastmessage: ', lastmessage);
			console.log('THEN1');
			const onlyNumber = lastmessage.text.replace(/[^0-9]/g, "");
			// console.log('sentTimeISO: ', sentTimeISO);
			console.log('onlyNumber: ', onlyNumber);
			console.log(lastmessage.message_date > sentTimeISO);
			// console.log('2022-10-18 14:34:14' > '2022-10-18 14:34:15')


			// while (count < 3) {
			// 	messageDB();
			// 	count++
			// };
		})
		.catch(() => console.log('catch error'))



};
messageDB();

console.log('OUT lasmessage:', lastmessage)