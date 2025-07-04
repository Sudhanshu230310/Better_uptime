"use client"
import React, { useState } from 'react';
import { Activity, Eye, EyeOff, Lock, User } from 'lucide-react';
import axios from 'axios';
import { Backend_Url } from '@/lib/utils';
import { useRouter } from 'next/navigation';

function SignIn() {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const router=useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signin logic here
    let responce= await axios.post(`${Backend_Url}/user/signin`,{
        username: formData.username,
        password: formData.password
    })
    
    localStorage.setItem("token", responce.data.jwt);
    router.push('/dashboard')
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Side - Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center mb-8">
            <Activity className="h-12 w-12 text-blue-400" />
            <span className="ml-3 text-3xl font-bold text-white">UpMonitor</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Sign in to your account to continue monitoring your websites and APIs. Keep track of your uptime, performance metrics, and get instant alerts.
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center text-gray-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <span>Access your monitoring dashboard</span>
            </div>
            <div className="flex items-center text-gray-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <span>View detailed analytics and reports</span>
            </div>
            <div className="flex items-center text-gray-300">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
              <span>Manage your alerts and notifications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signin Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center mb-8 lg:hidden">
            <Activity className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-2xl font-bold text-white">UpMonitor</span>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-gray-400">Access your monitoring dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <a href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign up for free
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;