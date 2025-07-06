import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyTestsPage = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserTests() {
      try {
        const res = await fetch('/api/user/tests', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!res.ok) throw new Error('Failed to fetch tests');
        const data = await res.json();
        setTests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserTests();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading your tests...</div>;

  if (tests.length === 0) return <div className="p-4 text-center">No tests attempted yet.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Tests</h2>
      <ul className="space-y-4">
        {tests.map(test => (
          <li key={test.id} className="border rounded p-4 shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{test.name}</p>
              <p className="text-sm text-gray-600">Attempted on: {new Date(test.attemptDate).toLocaleString()}</p>
              <p className="text-sm">Score: {test.score} / {test.totalMarks}</p>
            </div>
            <button
              onClick={() => navigate(`/test/${test.id}/result`)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              View Result
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTestsPage;
