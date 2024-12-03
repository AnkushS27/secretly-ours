'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import DashboardNavbar from '@/components/dashboardNavbar';
import Loading from '@/components/loading';
import { User } from '@/types/ApiResponse';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/manage-users');
        setUsers(response.data);
      } catch (error) {
        toast.error('Error fetching users. Error: ' + error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleChangeRole = async (
    userId: string,
    newRole: 'user' | 'admin' | 'moderator'
  ) => {
    try {
      await axios.put('/api/admin/manage-users', { userId, newRole });
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      toast.success(`User role updated to ${newRole}.`);
    } catch (error) {
      toast.error('Error changing role.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/admin/manage-users`, { data: { userId } });
      setUsers(users.filter((user) => user._id !== userId));
      toast.success('User deleted successfully.');
    } catch (error) {
      toast.error('Error deleting user.');
    }
  };

  if (loading) {
    return <Loading text='users' />;
  }

  return (
    <div className='min-h-[90vh] p-10'>
      <DashboardNavbar />
      <h2 className='mb-10 text-center text-2xl font-semibold'>Manage Users</h2>
      <table className='mt-4 w-full table-auto text-left'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Username</th>
            <th className='px-4 py-2'>Email</th>
            <th className='px-4 py-2'>Role</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className='px-4 py-2'>{user.username}</td>
              <td className='px-4 py-2'>{user.email}</td>
              <td className='px-4 py-2'>
                <select
                  value={user.role}
                  className='cursor-pointer rounded-md p-2'
                  onChange={(e) =>
                    handleChangeRole(
                      user._id,
                      e.target.value as 'user' | 'admin' | 'moderator'
                    )
                  }
                >
                  <option value='user'>User</option>
                  <option value='moderator'>Moderator</option>
                  <option value='admin'>Admin</option>
                </select>
              </td>
              <td className='px-4 py-2'>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className='text-red-500 hover:text-red-700'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
