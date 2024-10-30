import { NextResponse } from 'next/server';
import { mysqlPool } from '../../utils/db.js'; // ใช้ pool จากไฟล์ db.js


export async function POST(req) {
    const promisePool = mysqlPool.promise();
    try {
        const { name, email, password } = await req.json();
        console.log(name)
        console.log(email)
        console.log(password)

        // เตรียมคำสั่ง SQL สำหรับการบันทึกข้อมูลผู้ใช้
        const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        const values = [name, email, password];

        // บันทึกข้อมูลใน MySQL
        const registerUser = await promisePool.execute(query, values);
        console.log(registerUser)

        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
    }
}
