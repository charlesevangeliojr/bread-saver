"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/');
    }
    
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/Bread Saver.png"
                alt="Bread Saver logo"
                width={50}
                height={25}
              />
              <span className="text-xl font-bold text-amber-800">Bread Saver</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Bread Saver</h1>
          <p className="text-gray-600 mt-2">Manage your bakery inventory, sales, and operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Sales</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">$12,450</p>
            <p className="text-sm text-gray-600 mt-1">+15% from last month</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Inventory</h3>
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">234</p>
            <p className="text-sm text-gray-600 mt-1">Items in stock</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Fresh Bread</h3>
              <span className="text-2xl">🍞</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">89%</p>
            <p className="text-sm text-gray-600 mt-1">Freshness rate</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">47</p>
            <p className="text-sm text-gray-600 mt-1">Pending orders</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              Add New Product
            </button>
            <button className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              View Sales Report
            </button>
            <button className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Manage Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
