import { NextResponse } from 'next/server';
import { mysqlPool } from '../../utils/db.js';

export async function POST(req) {
  const promisePool = mysqlPool.promise();
  const { date } = await req.json();
  // ตรวจสอบรูปแบบวันที่
  if (!date || typeof date !== 'string') {
    return NextResponse.json({ message: 'Invalid date format' }, { status: 400 });
  }

  try {
    const [results] = await promisePool.query(
      'SELECT cases, deaths FROM us_covid_data.all_case_day WHERE date = ?',
      [date]
    );
    
    if (results.length > 0) {
      const cases = results[0].cases || 0;
      const deaths = results[0].deaths || 0;
      const recovered = cases - deaths;
      return NextResponse.json({ cases, deaths, recovered });
    } else {
      return NextResponse.json(
        { message: 'No data found for the provided date' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json(
      { message: 'Error fetching data', error: error.message }, // ส่งกลับข้อผิดพลาด
      { status: 500 }
    );
  }
}