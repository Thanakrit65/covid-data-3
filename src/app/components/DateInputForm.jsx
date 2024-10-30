import { useState } from 'react';

const DateInputForm = ({ onSearch }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(''); // ตั้งค่าเริ่มต้นปีเป็นค่าว่าง
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convert inputs to numbers for validation
    const dayNum = Number(day);
    const monthNum = Number(month);
    const yearNum = Number(year);
  
    // Validate inputs
    if (dayNum < 1 || dayNum > 31) {
      setError('Day must be between 1 and 31.');
      return;
    }
    if (monthNum < 1 || monthNum > 12) {
      setError('Month must be between 1 and 12.');
      return;
    }
    if (yearNum < 2020 || yearNum > 2023) {
      setError('Year must be between 2020 and 2023.');
      return;
    }
  
    setError(''); // Clear any previous errors
  
    // Convert day and month to strings with leading zeros if needed
    const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onSearch(date); // Call the onSearch function passed from DashboardPage
  };
  
  const incrementDay = () => {
    setDay((prev) => Math.min(Number(prev) + 1, 31)); // Increment day but keep it <= 31
  };

  const decrementDay = () => {
    setDay((prev) => Math.max(Number(prev) - 1, 1)); // Decrement day but keep it >= 1
  };

  const incrementMonth = () => {
    setMonth((prev) => {
      const newMonth = (Number(prev) + 1);
      return newMonth > 12 ? '1' : String(newMonth); // Wrap around to 1 if > 12
    });
  };

  const decrementMonth = () => {
    setMonth((prev) => {
      const newMonth = (Number(prev) - 1);
      return newMonth < 1 ? '12' : String(newMonth); // Wrap around to 12 if < 1
    });
  };

  const incrementYear = () => {
    setYear((prev) => (prev === '2020' ? '2021' : prev === '2021' ? '2022' : '2023')); // Increment year within range
  };

  const decrementYear = () => {
    setYear((prev) => (prev === '2023' ? '2022' : prev === '2022' ? '2021' : '2020')); // Decrement year within range
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex items-center mb-2">
        <button type="button" onClick={decrementDay} className="p-1 bg-gray-300 rounded">-</button>
        <input
          type="number"
          placeholder="Day (1-31)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded mx-2"
        />
        <button type="button" onClick={incrementDay} className="p-1 bg-gray-300 rounded">+</button>
      </div>
      <div className="flex items-center mb-2">
        <button type="button" onClick={decrementMonth} className="p-1 bg-gray-300 rounded">-</button>
        <input
          type="number"
          placeholder="Month (1-12)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded mx-2"
        />
        <button type="button" onClick={incrementMonth} className="p-1 bg-gray-300 rounded">+</button>
      </div>
      <div className="flex items-center mb-2">
        <button type="button" onClick={decrementYear} className="p-1 bg-gray-300 rounded">-</button>
        <input
          type="number"
          placeholder="Year (2020-2023)" // Placeholder แสดงข้อความที่ต้องการ
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          className="p-2 border border-gray-300 rounded mx-2"
        />
        <button type="button" onClick={incrementYear} className="p-1 bg-gray-300 rounded">+</button>
      </div>
      <button type="submit" className="p-2 bg-[#397d54] text-white py-2 px-4 rounded-md hover:bg-[#235d3a] transition-colors duration-300">
        Search
      </button>
    </form>
  );
};

export default DateInputForm;
