"use client"
import React, { useEffect, useState } from 'react';
import { 
  Activity, 
  Plus, 
  Globe, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Bell,
  User,
  LogOut,
  X,
  Monitor,
  Link as LinkIcon
} from 'lucide-react';
import axios from 'axios';
import { Backend_Url } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface Website {
  id: string;
  name: string;
  url: string;
  status: 'Up' | 'Down' | 'warning';
  uptime: number;
  responseTime: number;
  lastChecked: string;
  location: string;
}

function Dashboard() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const router=useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWebsite, setNewWebsite] = useState({
    name: '',
    url: '',
    checkInterval: '60'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Up':
        return 'text-green-400';
      case 'Down':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Up':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'Down':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'Up':
        return `${baseClasses} bg-green-900/50 text-green-300 border border-green-700`;
      case 'Down':
        return `${baseClasses} bg-red-900/50 text-red-300 border border-red-700`;
      case 'warning':
        return `${baseClasses} bg-yellow-900/50 text-yellow-300 border border-yellow-700`;
      default:
        return `${baseClasses} bg-gray-900/50 text-gray-300 border border-gray-700`;
    }
  };

  const handleAddWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
      await axios.post(`${Backend_Url}/website`,{
        url: newWebsite.url
      },{
        headers:{
            authorization: localStorage.getItem("token")
        }
      })
  };

  async function getData(){
    const responce=await axios.get(`${Backend_Url}/websites`,{
        headers:{
            authorization: localStorage.getItem("token")
        }
      })
      // console.log("hi")
      console.log(responce.data);
      
      setWebsites(responce.data.websites.map((w:any)=>({
        id: w.id,
        name: "s",
        url: w.url,
        status: w.ticks[0].status,
        uptime: "100",
        responseTime: w.ticks[0].response_time_ms,
        lastChecked: 'Just now',
        location: w.ticks[0].region_id=="1" ? "India" : "Usa"
      })))
  }
  useEffect(()=>{
    setInterval(async()=>{
        getData();
    },300)
  },[]);

  const upWebsites = websites.filter(w => w.status === 'Up').length;
  const downWebsites = websites.filter(w => w.status === 'Down').length;
  const warningWebsites = websites.filter(w => w.status === 'warning').length;
  const avgUptime = websites.reduce((acc, w) => acc + w.uptime, 0) / websites.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">UpMonitor</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-blue-400 transition-colors">
                <Bell className="h-6 w-6" />
              </button>
              <button className="text-gray-300 hover:text-blue-400 transition-colors">
                <Settings className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6 text-gray-400" />
                <span className="text-gray-300">John Doe</span>
              </div>
              <button onClick={()=>{localStorage.clear();router.push("/")}} className="text-gray-400 hover:text-red-400 transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Monitors</p>
                <p className="text-2xl font-bold text-white">{websites.length}</p>
              </div>
              <Monitor className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Online</p>
                <p className="text-2xl font-bold text-green-400">{upWebsites}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Issues</p>
                <p className="text-2xl font-bold text-red-400">{downWebsites + warningWebsites}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Uptime</p>
                <p className="text-2xl font-bold text-blue-400">{avgUptime.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-white">Website Monitors</h1>
                <p className="text-gray-400 mt-1">Monitor your websites and APIs in real-time</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Monitor</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-750">
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Status</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Website</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">URL</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Uptime</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Response Time</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Location</th>
                  <th className="text-left py-4 px-6 text-gray-300 font-medium">Last Checked</th>
                </tr>
              </thead>
              <tbody>
                {websites.map((website) => (
                  <tr key={website.id} className="border-b border-gray-700 hover:bg-gray-750 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(website.status)}
                        <span className={getStatusBadge(website.status)}>
                          {website.status.charAt(0).toUpperCase() + website.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-white">{website.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <LinkIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300 font-mono text-sm">{website.url}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-medium ${website.uptime >= 99 ? 'text-green-400' : website.uptime >= 95 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {website.uptime}%
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-medium ${website.responseTime < 500 ? 'text-green-400' : website.responseTime < 1000 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {website.responseTime > 0 ? `${website.responseTime}ms` : 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-300">{website.location}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-400 text-sm">{website.lastChecked}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Website Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Add New Monitor</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddWebsite} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Website Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newWebsite.name}
                  onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="My Website"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={newWebsite.url}
                  onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="https://example.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="interval" className="block text-sm font-medium text-gray-300 mb-2">
                  Check Interval
                </label>
                <select
                  id="interval"
                  value={newWebsite.checkInterval}
                  onChange={(e) => setNewWebsite({ ...newWebsite, checkInterval: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="30">Every 30 seconds</option>
                  <option value="60">Every 1 minute</option>
                  <option value="300">Every 5 minutes</option>
                  <option value="600">Every 10 minutes</option>
                </select>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
                >
                  Add Monitor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;