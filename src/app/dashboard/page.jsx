"use client";

import { useState, useEffect } from 'react';
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import DateInputForm from '../components/DateInputForm';
import Linechartsearchform from '../components/Linechartsearchform';
import { useSession } from 'next-auth/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import "../components/dashboard.css";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [searchResult, setSearchResult] = useState([]);
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("");
  const [showDetails, setShowDetails] = useState(null); // สำหรับ Drill-down
  const [filteredData, setFilteredData] = useState([]); // State สำหรับข้อมูลที่กรองและจัดเรียง

  const handleSearch = async (date) => {
    const response = await fetch('/api/getDataByDate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date })
    });

    const result = await response.json();
    if (result) {
      const totalCases = result.cases || 0; // หากไม่มีข้อมูลให้ตั้งค่าเป็น 0
      const totalDeaths = result.deaths || 0; // หากไม่มีข้อมูลให้ตั้งค่าเป็น 0
      setCases(totalCases); // ตั้งค่า cases
      setDeaths(totalDeaths); // ตั้งค่า deaths
    } else {
      console.log("not found");
      setCases(0); // ตั้งค่าเป็น 0 ถ้าไม่พบข้อมูล
      setDeaths(0); // ตั้งค่าเป็น 0 ถ้าไม่พบข้อมูล
    }
  };

  const lineSearch = async (date_start, date_end) => {
    const response = await fetch('/api/getDataForChart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date_start, date_end })
    });

    const result = await response.json();
    if (result && result.length > 0) {
      setSearchResult(result); // ตั้งค่า searchResult จากข้อมูลที่ได้
    } else {
      setSearchResult([]); // หากไม่มีข้อมูลให้ตั้งค่าเป็นอาร์เรย์ว่าง
    }
  };

  // Effect สำหรับจัดการการกรองและการจัดเรียง
  useEffect(() => {
    const sortedData = [...searchResult].sort((a, b) => {
      if (sortBy === "cases") return b.cases - a.cases;
      if (sortBy === "deaths") return b.deaths - a.deaths;
      return new Date(b.date) - new Date(a.date);
    });

    const filteredData = sortedData.filter(item => {
      if (!filterBy) return true;
      return item.cases >= filterBy;
    });

    setFilteredData(filteredData); // อัปเดตข้อมูลที่กรองและจัดเรียง
  }, [searchResult, sortBy, filterBy]); // อัปเดตเมื่อ searchResult, sortBy หรือ filterBy เปลี่ยนแปลง

  return (
    <main>
      <Container>
        <Navbar session={session} />
        <div className="flex-grow text-center p-10 dashboard">
          <p className="text-3xl mt-1 mb-5">Dashboard</p>

          <DateInputForm onSearch={handleSearch} />

          <div className="container">
            <div className="item zone1">
              <div className="itemzone1">
                <p className="text-2xl mb-10 bg-[#ffa242] text-white p-3 rounded-lg">CASE</p>
                <p className="text-4xl text-black text-center mt-12">{cases}</p>
              </div>
              <div className="itemzone1">
                <p className="text-2xl mb-10 bg-[#dc493f] text-white p-3 rounded-lg">DEATH</p>
                <p className="text-4xl text-black text-center mt-12">{deaths}</p>
              </div>
              <div className="itemzone1">
                <p className="text-2xl mb-2 bg-[#5d8d73] text-white p-3 rounded-lg text-center">RECOVER</p>
                <p className="text-4xl text-black text-center mt-12">{(cases && deaths) ? (cases - deaths) : 0}</p>
              </div>
            </div>

            <Linechartsearchform onSearch={lineSearch} />

            {/* Zone2: แสดงกราฟเส้น */}
            <div className="item zone2">
              <LineChart width={1000} height={300} data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cases" stroke="#ffa242" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="deaths" stroke="#dc493f" />
              </LineChart>
            </div>

            {/* Zone3: Search Results */}
            <div className="item zone3">
              <div className="itemzone3">
                <h2 className="text-2xl mb-5">Search Results</h2>

                {/* Sort By */}
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="ml-2 p-2 border">
                  <option value="date">Date</option>
                  <option value="cases">Cases</option>
                  <option value="deaths">Deaths</option>
                </select>

                {/* Filter By Cases */}
                <label className="ml-5">Filter Cases &gt;=</label>
                <input
                  type="number"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="ml-2 p-2 border"
                />

                {/* Table for Results */}
                <div className="overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200 mt-5">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cases</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deaths</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.map((result, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">{result.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{result.cases}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{result.deaths}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => setShowDetails(showDetails === index ? null : index)}
                              className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                              {showDetails === index ? "Hide Details" : "Show Details"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Show Additional Details */}
                {showDetails !== null && (
                  <div className="p-5 bg-gray-100 rounded mt-5">
                    <h3 className="text-xl font-bold mb-3">Details for {filteredData[showDetails].date}</h3>
                    <p>New Cases: {filteredData[showDetails].new_cases}</p>
                    <p>New Deaths: {filteredData[showDetails].new_deaths}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}