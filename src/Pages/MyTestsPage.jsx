import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import HomeNavbar from '../Components/HomeNavbar';

function MyTestsPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortOrder] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await api.get('/attempt/myAttempts', { withCredentials: true });
        setAttempts(res.data.attempts || []);
      } catch (err) {
        console.error('Error fetching attempts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAttempts();
  }, []);

  const filteredAttempts = attempts
    .filter((attempt) => {
      if (filter === 'Finished') return attempt.status === 'submitted';
      if (filter === 'Not Finished') return attempt.status !== 'submitted';
      return true; // all
    })
    .sort((a, b) => {
      const dateA = new Date(a.started_at || a.created_at);
      const dateB = new Date(b.started_at || b.created_at);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    if (loading) {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
  return (
    <div>
      <HomeNavbar />

      <div className="max-w-7xl mx-auto p-4">
        <div className='flex flex-row justify-between items-center'>
          <div>
               <h2 className="text-2xl font-semibold mb-6">My Tests</h2>
          </div>
         
        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-4 py-2 rounded-md text-sm"
          >
            <option value="all">All Tests</option>
            <option value="Finished">Finished</option>
            <option value="Not Finished">Not Finished</option>
          </select>

        </div>
        </div>
        

        {/* Grid of Attempts */}
        {filteredAttempts.length === 0 ? (
          <p className="text-gray-500 text-center">No test attempts found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAttempts.map((attempt) => (
              <div
                key={attempt.id}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div  className='flex flex-row justify-between items-center'>
                  <p className="text-blue-700 font-bold mb-1">{attempt.test_name}</p>
                  <p className="text-sm text-gray-600">
                    Status: <span className={`font-semibold ${attempt.status === 'submitted' ? 'text-green-600' : 'text-yellow-500'}`}>
                      {attempt.status === 'submitted' ? 'Finished' : 'Not Finished'}
                    </span>
                  </p>
                  </div>
                  {attempt.status === 'submitted' && (
                    <div className='flex flex-row justify-between items-center'>
                      <p className="text-sm text-gray-600 mt-1">
                        Score: <span className="font-semibold text-blue-700">
                          {attempt.total_score} / {attempt.total_marks}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Percentage: {(attempt.total_score / attempt.total_marks * 100).toFixed(1)}%
                      </p>
                    </div>
                  )}
                </div>

                {attempt.status === 'submitted' ? (
                  <button
                    onClick={() => navigate(`/test-results/${attempt.id}`)}
                    className="mt-4 w-full text-center text-white bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm"
                  >
                    View Full Results
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-4 w-full text-center bg-gray-200 text-gray-500 py-2 rounded-lg text-sm cursor-not-allowed"
                  >
                    Not Finished
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTestsPage;
