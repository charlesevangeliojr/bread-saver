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
  branchType: string;
  bakeryName: string;
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
                {user.picture ? (
                  <Image
                    src={user.picture}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
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

      {/* Dashboard Content - Different for Single vs Multiple Branch */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Section */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome to {user.bakeryName}</h1>
              <p className="text-gray-600 mt-2">
                {user.branchType === 'single' ? 'Single Branch Bakery' : 'Multiple Branch Bakery'} • {user.email}
              </p>
            </div>
            <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-medium">
              {user.branchType === 'single' ? '🏪 Single Branch' : '🏢 Multiple Branches'}
            </div>
          </div>
        </div>

        {user.branchType === 'single' ? (
          /* Single Branch Dashboard */
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Today's Sales</h3>
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-2xl font-bold text-amber-600">$1,245</p>
                <p className="text-sm text-gray-600 mt-1">+12% from yesterday</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Inventory Items</h3>
                  <span className="text-2xl">📦</span>
                </div>
                <p className="text-2xl font-bold text-amber-600">48</p>
                <p className="text-sm text-gray-600 mt-1">3 items low in stock</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Fresh Bread</h3>
                  <span className="text-2xl">🍞</span>
                </div>
                <p className="text-2xl font-bold text-amber-600">92%</p>
                <p className="text-sm text-gray-600 mt-1">Excellent freshness</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Active Orders</h3>
                  <span className="text-2xl">📋</span>
                </div>
                <p className="text-2xl font-bold text-amber-600">7</p>
                <p className="text-sm text-gray-600 mt-1">2 ready for pickup</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-left">
                    🛒 Record New Sale
                  </button>
                  <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    📦 Update Inventory
                  </button>
                  <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    🍞 Add New Product
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Overview</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Morning Sales</span>
                    <span className="font-semibold">$456</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Afternoon Sales</span>
                    <span className="font-semibold">$789</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Top Selling Item</span>
                    <span className="font-semibold">Sourdough Bread</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Customers Served</span>
                    <span className="font-semibold">34</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Multiple Branch Dashboard */
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Branches</h3>
                  <span className="text-2xl">🏢</span>
                </div>
                <p className="text-2xl font-bold text-amber-600">3</p>
                <p className="text-sm text-gray-600 mt-1">All branches active</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Combined Sales</h3>
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-2xl font-bold text-amber-600">$4,856</p>
                <p className="text-sm text-gray-600 mt-1">+18% from last week</p>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Employees</h3>
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-2xl font-bold text-amber-600">24</p>
                <p className="text-sm text-gray-600 mt-1">Across all branches</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Branch Performance</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-amber-500 pl-4 py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">Main Branch - Downtown</h4>
                      <p className="text-sm text-gray-600">Manager: John Smith</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-amber-600">$2,145</p>
                      <p className="text-sm text-gray-600">Today's sales</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">North Branch</h4>
                      <p className="text-sm text-gray-600">Manager: Sarah Johnson</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-amber-600">$1,678</p>
                      <p className="text-sm text-gray-600">Today's sales</p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900">East Branch</h4>
                      <p className="text-sm text-gray-600">Manager: Mike Davis</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-amber-600">$1,033</p>
                      <p className="text-sm text-gray-600">Today's sales</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Management Actions</h2>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-left">
                    📊 Generate Combined Report
                  </button>
                  <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    🏢 Manage Branches
                  </button>
                  <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    👥 Employee Management
                  </button>
                  <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    📦 Inventory Transfer
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">System Alerts</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <span className="text-yellow-600">⚠️</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">North Branch - Low on flour</p>
                      <p className="text-xs text-gray-600">2 bags remaining</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-600">✅</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">All branches on track</p>
                      <p className="text-xs text-gray-600">Daily goals 78% complete</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-600">ℹ️</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Monthly report ready</p>
                      <p className="text-xs text-gray-600">View in reports section</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
