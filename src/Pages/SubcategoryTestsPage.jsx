import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import { useUser } from '../context/UserContext';
import HomeNavbar from '../components/HomeNavbar';


export default function SubcategoryTestsPage() {
  const { subId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.info('Please login to view tests');
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await api.get(`/tests/by-subcategory/${subId}`, {
          withCredentials: true,
        });
        setTests(res.data || []);
      } catch (err) {
        console.error('Error fetching tests:', err);
        toast.error('Failed to load tests');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTests();
  }, [subId, user]);

  const filterAndSort = (type) => {
    let result = tests.filter(
      (t) =>
        t.type.toLowerCase() === type &&
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === 'latest') {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sort === 'order') {
      result.sort((a, b) => (a.order_number || 0) - (b.order_number || 0));
    }

    return result;
  };

  const previousTests = filterAndSort('pyq');
  const mockTests = filterAndSort('mock');
  const subjectTests = filterAndSort('subject wise');

  const renderTestCard = (test) => (
    <div
      key={test.id}
      className="mb-4 w-60 p-3 border rounded shadow bg-white flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-md"
    >
      <h3 className="text-base font-semibold text-gray-800 mb-2 text-center">{test.name}</h3>
      <p className="text-sm font-bold text-gray-700 text-center">
        {test.duration_minutes} min • {test.total_questions} Q • {test.total_marks} Marks
      </p>
      <button 
        onClick={() => navigate(`/test/${test.id}/instructions`)}
        className="mt-3 bg-blue-600 text-white px-4 py-1 rounded text-sm font-medium hover:bg-blue-700 transition">
        Start Test
      </button>
    </div>
  );

  if (!user) return null;

  return (
    <div>
      <div>
        <HomeNavbar/>
        </div>
    <div className="px-4 py-8 max-w-[95%] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Tests</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tests..."
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="latest">Sort by Latest</option>
          <option value="order">Sort by Order Number</option>
        </select>
      </div>

      {/* Mobile-only Filter */}
      <div className="block md:hidden mb-6">
        
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Show All</option>
          <option value="pyq">Previous Year Questions</option>
          <option value="mock">Mock Tests</option>
          <option value="suject wise">Subject-Wise Tests</option>
        </select>
      </div>

      {/* Responsive Layout */}
      {loading ? (
        <div className="text-center text-gray-500">Loading tests...</div>
      ) : (
        <>
          {/* All 3 sections for md+ or filtered one for sm */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(selectedType === 'all' || selectedType === 'pyq') && (
              <div >
                <h2 className="text-xl  font-semibold text-blue-700 mb-4">Previous Year Papers</h2>
                {previousTests.length === 0 ? (
                  <p className="text-sm text-gray-500">No tests found.</p>
                ) : (
                  previousTests.map(renderTestCard)
                )}
              </div>
            )}
            {(selectedType === 'all' || selectedType === 'mock') && (
              <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Mock Tests</h2>
                {mockTests.length === 0 ? (
                  <p className="text-sm text-gray-500">No tests found.</p>
                ) : (
                  mockTests.map(renderTestCard)
                )}
              </div>
            )}
            {(selectedType === 'all' || selectedType === 'subject wise') && (
              <div>
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Subject-Wise Tests</h2>
                {subjectTests.length === 0 ? (
                  <p className="text-sm text-gray-500">No tests found.</p>
                ) : (
                  subjectTests.map(renderTestCard)
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
    </div>
  );
}
