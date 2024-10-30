import { NextResponse } from 'next/server';
import { mysqlPool } from '../../utils/db.js'; // ใช้ pool จากไฟล์ db.js

export async function POST(req) {
    const promisePool = mysqlPool.promise();
    try {
        const { date, fips, cases, deaths, email } = await req.json();
        // เตรียมคำสั่ง SQL สำหรับการบันทึกข้อมูลผู้ใช้
        const query = `INSERT INTO Input_table (date, fips, cases, deaths, email) VALUES (?, ?, ?, ?, ?)`;
        const values = [date, fips, cases, deaths, email];

        // บันทึกข้อมูลใน MySQL
        const updateData = await promisePool.execute(query, values);
        console.log(updateData)

        return NextResponse.json({ message: "Updated." }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred while update." }, { status: 500 });
    }
}