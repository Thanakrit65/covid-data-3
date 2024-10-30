import { NextResponse } from 'next/server';
import { mysqlPool } from '../../utils/db.js';// ใช้การเชื่อมต่อ MySQL จาก pool

export async function POST(req) {
    const promisePool = mysqlPool.promise();
    try {
        
        const { email } = await req.json();
        console.log(email)
        // ใช้คำสั่ง SQL เพื่อค้นหาผู้ใช้ใน MySQL
        const [rows] = await promisePool.query('SELECT email FROM users WHERE email = ?', [email]);
        const user = rows[0]; // เลือกผู้ใช้จากผลลัพธ์
        console.log(rows)
        console.log("User: ", user);

        return NextResponse.json({ user });

    } catch(error) {
        console.error("Error: ", error);
        return NextResponse.json({ message: "An error occurred while searching for the user." }, { status: 500 });
    }
}
