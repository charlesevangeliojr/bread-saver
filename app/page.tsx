"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Signup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Sign Up for Bread Saver</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                  placeholder="•••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Bakery Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                  placeholder="Your Bakery Name"
                />
              </div>
              
              <button className="w-full px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold transition-colors">
                Sign Up with Email
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-600 font-medium">or continue with</span>
                </div>
              </div>
              
              <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-colors">
                <Image
                  src="/google-logo.svg"
                  alt="Google logo"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className="text-gray-900">Sign up with Google</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Image
            src="/Bread Saver.png"
            alt="Bread Saver logo"
            width={50}
            height={25}
          />
          <span className="text-xl font-bold text-amber-800">Bread Saver</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors">Home</a>
          <a href="#features" className="text-gray-700 hover:text-amber-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-amber-600 transition-colors">How It Works</a>
          <a href="#testimonials" className="text-gray-700 hover:text-amber-600 transition-colors">Testimonials</a>
          <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Signup
          </button>
          <button className="px-4 py-2 text-amber-600 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Revolutionizing Bakery Management
              </h1>
              <p className="text-lg md:text-xl text-gray-800 mb-6 md:mb-8 leading-relaxed">
                Reduce waste and maximize profits with our innovative platform designed specifically for bakeries. Track inventory, ingredients, breads, sales, and monitor bread shelf life with integrated POS kiosk.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                <button className="px-6 py-3 md:px-8 md:py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-base md:text-lg font-medium transition-colors shadow-lg w-full sm:w-auto">
                  Register Your Bakery
                </button>
                <button className="px-6 py-3 md:px-8 md:py-3 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 text-base md:text-lg font-medium transition-colors w-full sm:w-auto">
                  Learn More
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>30-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-600 font-bold">✓</span>
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="relative">
                <Image
                  src="/bakery-hero.png"
                  alt="Modern bakery with fresh bread"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl w-full h-auto"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-amber-600">40%</p>
                        <p className="text-xs text-gray-700">Waste Reduction</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-amber-600">25%</p>
                        <p className="text-xs text-gray-700">Profit Increase</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-amber-600">24/7</p>
                        <p className="text-xs text-gray-700">Support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Complete Bakery Management System
            </h2>
            <p className="text-lg md:text-xl text-gray-800 max-w-3xl mx-auto px-4">
              Track inventory, ingredients, breads, sales, and monitor bread shelf life with integrated POS kiosk
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Inventory Tracking */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl">📦</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Inventory Tracking</h3>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                <li>• Real-time inventory monitoring</li>
                <li>• Stock level alerts</li>
                <li>• Automatic stock updates</li>
                <li>• Multi-location tracking</li>
                <li>• Low stock notifications</li>
              </ul>
            </div>
            
            {/* Ingredients Management */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl">🥖</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Ingredients Management</h3>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                <li>• Ingredient stock tracking</li>
                <li>• Recipe cost calculation</li>
                <li>• Supplier management</li>
                <li>• Automatic ingredient deduction</li>
                <li>• Quality control tracking</li>
              </ul>
            </div>
            
            {/* Bread Management */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl">�</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Bread Management</h3>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                <li>• Bread freshness tracking</li>
                <li>• Shelf life monitoring</li>
                <li>• Production scheduling</li>
                <li>• Quality control</li>
                <li>• Waste reduction alerts</li>
              </ul>
            </div>
            
            {/* Sales Management */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl">💰</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Sales Management</h3>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                <li>• Real-time sales tracking</li>
                <li>• Payment processing</li>
                <li>• Customer management</li>
                <li>• Sales analytics</li>
                <li>• Revenue reporting</li>
              </ul>
            </div>
            
            {/* Shelf Life Monitoring */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl">⏰</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">Shelf Life Monitoring</h3>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                <li>• Real-time freshness tracking</li>
                <li>• Expiry date monitoring</li>
                <li>• Automatic pull-out alerts</li>
                <li>• Quality degradation tracking</li>
                <li>• Waste reduction suggestions</li>
              </ul>
            </div>
            
            {/* POS Kiosk Integration */}
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                <span className="text-xl sm:text-2xl">�️</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">POS Kiosk Integration</h3>
              <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                <li>• Integrated POS system</li>
                <li>• Self-service kiosk</li>
                <li>• Real-time synchronization</li>
                <li>• Payment processing</li>
                <li>• Order management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">How It Works</h2>
            <p className="text-lg md:text-xl text-gray-600">Get started in minutes, not hours</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-amber-600">1</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Sign Up</h3>
              <p className="text-sm md:text-base text-gray-600">Create your free account in less than 2 minutes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-amber-600">2</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Setup Your Bakery</h3>
              <p className="text-sm md:text-base text-gray-600">Add your products and set up your inventory</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-amber-600">3</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">Start Growing</h3>
              <p className="text-sm md:text-base text-gray-600">Manage operations and watch your profits increase</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">What Bakery Owners Say</h2>
            <p className="text-lg md:text-xl text-gray-600">Join thousands of successful bakeries</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg md:text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic text-sm md:text-base">
                "Bread Saver has completely transformed our bakery business! We've reduced waste by 40% and increased profits significantly."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-200 rounded-full flex items-center justify-center">
                  <span className="text-amber-800 font-bold text-sm md:text-base">JD</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">John Doe</p>
                  <p className="text-xs md:text-sm text-gray-600">Sweet Dreams Bakery</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg md:text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic text-sm md:text-base">
                "The inventory management feature alone has saved us hours each week. Highly recommend for any serious bakery owner."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-200 rounded-full flex items-center justify-center">
                  <span className="text-green-800 font-bold text-sm md:text-base">SM</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">Sarah Miller</p>
                  <p className="text-xs md:text-sm text-gray-600">Artisan Breads Co.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg md:text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic text-sm md:text-base">
                "Smart discounting has helped us sell products that would have been wasted. Our customers love the deals!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-800 font-bold text-sm md:text-base">MC</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">Mike Chen</p>
                  <p className="text-xs md:text-sm text-gray-600">Golden Crust Bakery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            Ready to Transform Your Bakery?
          </h2>
          <p className="text-lg md:text-xl text-white mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of successful bakeries using Bread Saver to reduce waste and increase profits.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button className="px-6 py-3 md:px-8 md:py-4 bg-white text-amber-600 rounded-lg hover:bg-gray-100 text-base md:text-lg font-medium transition-colors shadow-lg w-full sm:w-auto">
              Start Free Trial
            </button>
            <button className="px-6 py-3 md:px-8 md:py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-amber-600 text-base md:text-lg font-medium transition-colors w-full sm:w-auto">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/Breads Saver.png"
                  alt="Bread Saver logo"
                  width={40}
                  height={20}
                />
                <span className="text-lg md:text-xl font-bold">Bread Saver</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base">Empowering bakeries to reduce waste and maximize profits.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>
            
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm md:text-base">&copy; 2024 Bread Saver. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
