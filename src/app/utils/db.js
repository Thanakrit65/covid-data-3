const mysql = require('mysql2');

// ให้แน่ใจว่าตัวแปรสภาพแวดล้อมถูกตั้งค่าและเข้าถึงได้
const uri = process.env.MYSQL_URI;

if (!uri) {
    throw new Error('MYSQL_URI is not defined');
}

export const mysqlPool = mysql.createPool(uri);
