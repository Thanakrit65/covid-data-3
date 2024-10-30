import db from '../../../utils/db'; // ปรับให้เข้ากับที่อยู่ของ db.js ของคุณ

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [results] = await db.query('SELECT name, lat, lng, info FROM your_table'); // ปรับตามโครงสร้างฐานข้อมูลของคุณ
      return res.status(200).json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching data' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
