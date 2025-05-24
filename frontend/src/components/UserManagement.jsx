import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserManagement() {
  // User state
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
    role: 'user'
  });

  // Inventory state
  const [inventoryForm, setInventoryForm] = useState({
    item_name: '',
    model_no: '',
    remark: ''
  });

  // Client state
  const [clientForm, setClientForm] = useState({
    client_name: '',
    address: ''
  });

  const loadUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load users');
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    if (!userForm.username || !userForm.password || !userForm.role) {
      alert('All fields are required');
      return;
    }

    try {
      await axios.post('http://localhost:3001/users', userForm);
      alert('User created!');
      setUserForm({ username: '', password: '', role: 'user' });
      loadUsers();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Error creating user');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to delete user');
    }
  };

  const createInventory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/inventory', inventoryForm);
      alert('Inventory item added!');
      setInventoryForm({ item_name: '', model_no: '', remark: '' });
    } catch (error) {
      alert('Error adding inventory item');
    }
  };

  const createClient = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/clients', clientForm);
      alert('Client added!');
      setClientForm({ client_name: '', address: '' });
    } catch (error) {
      alert('Error adding client');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">User Management Dashboard</h2>

      {/* Create User */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-2">Create User</h3>
        <form onSubmit={createUser} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Username" value={userForm.username}
            onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
            className="p-2 border rounded" required />
          <input type="password" placeholder="Password" value={userForm.password}
            onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
            className="p-2 border rounded" required />
          <select value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
            className="p-2 border rounded col-span-2">
            <option value="admin">Admin</option>
            <option value="supervisor">Supervisor</option>
            <option value="user">User</option>
          </select>
          <div className="md:col-span-2 flex justify-center">
            <button type="submit" className="bg-blue-600 text-white px-3 py-2 text-sm rounded w-auto">
              Create User
            </button>
          </div>
        </form>
      </div>

      {/* User Table */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-2">Existing Users</h3>
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Username</th>
              <th className="border px-2 py-1">Role</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="border px-2 py-1">{user.id}</td>
                <td className="border px-2 py-1">{user.username}</td>
                <td className="border px-2 py-1">{user.role}</td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-600 text-white px-3 py-1 text-sm rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Inventory */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-2">Create Inventory</h3>
        <form onSubmit={createInventory} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Item Name" value={inventoryForm.item_name}
            onChange={(e) => setInventoryForm({ ...inventoryForm, item_name: e.target.value })}
            className="p-2 border rounded" required />
          <input type="text" placeholder="Model No" value={inventoryForm.model_no}
            onChange={(e) => setInventoryForm({ ...inventoryForm, model_no: e.target.value })}
            className="p-2 border rounded" required />
          <input type="text" placeholder="Remark" value={inventoryForm.remark}
            onChange={(e) => setInventoryForm({ ...inventoryForm, remark: e.target.value })}
            className="p-2 border rounded col-span-2" />
          <div className="md:col-span-2 flex justify-center">
            <button type="submit" className="bg-blue-600 text-white px-3 py-2 text-sm rounded w-auto">
              Create Inventory
            </button>
          </div>
        </form>
      </div>

      {/* Create Client */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Create Client</h3>
        <form onSubmit={createClient} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="Client Name" value={clientForm.client_name}
            onChange={(e) => setClientForm({ ...clientForm, client_name: e.target.value })}
            className="p-2 border rounded" required />
          <input type="text" placeholder="Address" value={clientForm.address}
            onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })}
            className="p-2 border rounded col-span-2" />
          <div className="md:col-span-2 flex justify-center">
            <button type="submit" className="bg-blue-600 text-white px-3 py-2 text-sm rounded w-auto">
              Create Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
