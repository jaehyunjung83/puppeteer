var iMessage = require('imessage');
const imessage = require("osa-imessage");


var im = new iMessage();
im
    .getAll()
    .keyword(["love", "happy"], ["sad", "hate"])
    .from(["+1231231231", "+89898989898"])
    .limit(10)
    .exec(function (err, rows) {
        console.log(rows);
    })