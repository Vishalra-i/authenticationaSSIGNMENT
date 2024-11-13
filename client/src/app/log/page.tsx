'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [actionType, setActionType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/log/logs`, {
        params: { actionType, startDate, endDate, page },
      });
      setLogs(response.data.logs);
      setTotalPages(response.data.totalPages || 1);
    } catch (err: any) {
      setError('Failed to fetch logs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchLogs();
    }, 300); // Debounce API calls by 300ms

    return () => clearTimeout(debounceTimeout);
  }, [actionType, startDate, endDate, page]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Logs</h1>

      {/* Filters */}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Filter by Action Type"
          value={actionType}
          onChange={(e) => setActionType(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading logs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Action Type</th>
                <th className="border px-4 py-2">Timestamp</th>
                <th className="border px-4 py-2">User ID</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Additional Data</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log: any) => (
                  <tr key={log._id}>
                    <td className="border px-4 py-2">{log.actionType}</td>
                    <td className="border px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="border px-4 py-2">{log.userId}</td>
                    <td className="border px-4 py-2">{log.role}</td>
                    <td className="border px-4 py-2">{log.additionalData}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border px-4 py-2 text-center">
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center items-center space-x-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="p-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="p-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogsPage;
