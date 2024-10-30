import { NextResponse } from 'next/server';
import { mysqlPool } from '../../utils/db.js'; // ปรับให้เข้ากับที่อยู่ของ db.js ของคุณ

export async function POST(req) {
  const promisePool = mysqlPool.promise();
  const { date_start, date_end } = await req.json();

  try {
    const [results] = await promisePool.query(
      'SELECT * FROM us_covid_data.all_case_day WHERE date BETWEEN ? AND ?;', 
      [date_start, date_end]
    );

    // ฟังก์ชันแปลงวันที่
    const transformDatesMethod1 = (data) => {
      return data.map(item => ({
        ...item,
        date: new Date(item.date).toISOString().split('T')[0], // แปลงวันที่
      }));
    };

    const transformedData1 = transformDatesMethod1(results);
    return NextResponse.json(transformedData1); // ส่งข้อมูลที่ถูกแปลงกลับไป
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 }); // ส่งกลับข้อผิดพลาด
  }
}