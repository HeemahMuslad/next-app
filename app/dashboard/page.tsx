'use client';

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='p-5' >
      <h1 className=" font-bold mb-10 text-lg">Dashboard</h1>
      <p>Welcome, {user ? user.name : ''}</p>
      <button className="bg-gray-900 mt-3  text-white px-5 py-2 rounded-md" onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
