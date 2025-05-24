import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Clients() {
  const [form, setForm] = useState({ client_name: '', address: '' });
  const [data, setData] = useState([]);

  const loadClients = async () => {
    const res = await axios.get('http://localhost:3001/clients');
    setData(res.data);
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/clients', form);
    setForm({ client_name: '', address: '' });
    loadClients();
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Client Management</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Client Name"
          value={form.client_name}
          onChange={(e) => setForm({ ...form, client_name: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2"
        >
          Add Client
        </button>
      </form>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2">S.No</th>
            <th className="border px-2">Client Name</th>
            <th className="border px-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id}>
              <td className="border px-2">{i + 1}</td>
              <td className="border px-2">{row.client_name}</td>
              <td className="border px-2">{row.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
