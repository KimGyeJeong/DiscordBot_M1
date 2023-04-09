const mysql = require('mysql2');

console.log('DB connection test');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    post: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect();

console.log('DB CONNECT START');

connection.query('SELECT * from nodejs.discordbot',(error, rows, fields)=>{
    if(error){
        console.log(error);
    } else {
        console.log(rows);  // 한줄
        rows.forEach(e => console.log(e));  // 한줄씩
    }
});

connection.query('select * from nodejs.break where brk_seq = 1 order by brk_seq desc',(error, rows, fields)=>{
    if(error){
        console.log(error);
    } else {
        console.log(rows);  // 한줄
        rows.forEach(e => console.log(e));  // 한줄씩

        console.log(rows[0].BRK_SEQ);
        console.log(rows[0].BRK_FRDATE);
        let REAL_DATE = rows[0].BRK_TODATE - rows[0].BRK_FRDATE;
        console.log(typeof rows[0].BRK_TODATE);
        console.log(`REAL DATE = ${REAL_DATE}`);
        // console.log(fields);
    }
})


connection.end();