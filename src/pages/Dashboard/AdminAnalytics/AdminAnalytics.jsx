import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { 
  FaChartLine, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaBriefcase, 
  FaMoneyBillWave,
  FaUserGraduate,
  FaSyncAlt,
  FaRegClock,
  FaChartPie,
  FaChartBar
} from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const [period, setPeriod] = useState('monthly');
  const [selectedChart, setSelectedChart] = useState('bar');

  const { data: stats = {}, isLoading, refetch } = useQuery({
    queryKey: ['analytics', period],
    queryFn: async () => {
      const res = await axiosSecure.get(`/analytics?period=${period}`);
      return res.data;
    },
  });

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 300000);
    return () => clearInterval(interval);
  }, [refetch]);

  const commonData = {
    labels: ['Users', 'Tutors', 'Jobs', 'Payments', 'Students'],
    datasets: [
      {
        label: 'Platform Statistics',
        data: [
          stats.totalUsers || 0,
          stats.totalTutors || 0,
          stats.totalJobs || 0,
          stats.totalPayments || 0,
          stats.totalStudent || 0,
        ],
        backgroundColor: [
          'rgba(252, 187, 69, 0.7)',   // #FCBB45
          'rgba(0, 84, 130, 0.7)',     // #005482
          'rgba(218, 58, 96, 0.7)',    // #DA3A60
          'rgba(112, 197, 215, 0.7)',  // #70C5D7
          'rgba(0, 84, 130, 0.7)',     // #005482
        ],
        borderColor: [
          '#FCBB45',
          '#005482',
          '#DA3A60',
          '#70C5D7',
          '#005482',
        ],
        borderWidth: 2,
      }
    ]
  };

  const barData = {
    ...commonData,
    datasets: [{
      ...commonData.datasets[0],
      borderRadius: 6,
    }]
  };

  const pieData = {
    ...commonData,
    datasets: [{
      ...commonData.datasets[0],
      borderWidth: 1,
    }]
  };

  const lineData = {
    ...commonData,
    datasets: [{
      ...commonData.datasets[0],
      borderWidth: 2,
      tension: 0.4,
      fill: true,
      backgroundColor: 'rgba(112, 197, 215, 0.1)',
      borderColor: '#70C5D7',
    }]
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          font: {
            family: 'Inter',
            size: 12
          },
          color: '#005482'
        }
      },
      title: { 
        display: false
      },
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      y: { 
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 84, 130, 0.1)',
        },
        ticks: {
          color: '#005482',
          font: {
            family: 'Inter'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#005482',
          font: {
            family: 'Inter'
          }
        }
      }
    },
  };

  const pieOptions = {
    ...commonOptions,
    cutout: '0%',
    radius: '90%',
  };

  const lineOptions = {
    ...commonOptions,
    scales: {
      y: { 
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 84, 130, 0.1)',
        },
        ticks: {
          color: '#005482',
          font: {
            family: 'Inter'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#005482',
          font: {
            family: 'Inter'
          }
        }
      }
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="text-center">
          <FaChartLine className="text-5xl text-[#70C5D7] animate-bounce mx-auto mb-4" />
          <p className="text-[#005482] text-lg">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-6 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="bg-gradient-to-br from-[#005482] to-[#70C5D7] p-2.5 md:p-3 rounded-xl md:rounded-2xl">
                  <FaChartLine className="text-xl md:text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#005482]">Platform Analytics</h2>
                  <p className="text-sm md:text-base text-[#005482]/60 mt-0.5 md:mt-1">Comprehensive platform performance metrics</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
              <div className="flex items-center bg-white rounded-xl border border-[#70C5D7]/20 p-2 w-full sm:w-auto">
                <FaRegClock className="text-[#70C5D7] mr-2 text-lg" />
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="bg-transparent text-[#005482] font-medium focus:outline-none text-sm md:text-base w-full sm:w-auto"
                >
                  <option value="daily">Daily View</option>
                  <option value="weekly">Weekly View</option>
                  <option value="monthly">Monthly View</option>
                </select>
              </div>
              
              <button
                onClick={() => refetch()}
                className="flex items-center justify-center space-x-2 bg-[#DA3A60] hover:bg-[#DA3A60]/90 text-white px-4 py-2 rounded-xl transition-colors duration-200 w-full sm:w-auto"
              >
                <FaSyncAlt className="text-sm" />
                <span className="text-sm md:text-base">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-[#FCBB45]/10 to-transparent p-4 md:p-6 rounded-xl border border-[#FCBB45]/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs md:text-sm text-[#005482]/70 font-medium mb-1">Total Users</p>
                <h3 className="text-xl md:text-3xl font-bold text-[#005482]">{stats.totalUsers || 0}</h3>
              </div>
              <div className="bg-[#FCBB45] p-2 md:p-2.5 rounded-xl shadow-lg">
                <FaUsers className="text-lg md:text-xl text-white" />
              </div>
            </div>
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#FCBB45]/20">
              <p className="text-xs text-[#005482]/60">Platform registered users</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#005482]/10 to-transparent p-4 md:p-6 rounded-xl border border-[#005482]/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs md:text-sm text-[#005482]/70 font-medium mb-1">Total Tutors</p>
                <h3 className="text-xl md:text-3xl font-bold text-[#005482]">{stats.totalTutors || 0}</h3>
              </div>
              <div className="bg-[#005482] p-2 md:p-2.5 rounded-xl shadow-lg">
                <FaChalkboardTeacher className="text-lg md:text-xl text-white" />
              </div>
            </div>
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#005482]/20">
              <p className="text-xs text-[#005482]/60">Active teaching professionals</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#DA3A60]/10 to-transparent p-4 md:p-6 rounded-xl border border-[#DA3A60]/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs md:text-sm text-[#005482]/70 font-medium mb-1">Total Jobs</p>
                <h3 className="text-xl md:text-3xl font-bold text-[#005482]">{stats.totalJobs || 0}</h3>
              </div>
              <div className="bg-[#DA3A60] p-2 md:p-2.5 rounded-xl shadow-lg">
                <FaBriefcase className="text-lg md:text-xl text-white" />
              </div>
            </div>
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#DA3A60]/20">
              <p className="text-xs text-[#005482]/60">Posted teaching opportunities</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#70C5D7]/10 to-transparent p-4 md:p-6 rounded-xl border border-[#70C5D7]/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs md:text-sm text-[#005482]/70 font-medium mb-1">Total Payments</p>
                <h3 className="text-xl md:text-3xl font-bold text-[#005482]">{stats.totalPayments || 0}</h3>
              </div>
              <div className="bg-[#70C5D7] p-2 md:p-2.5 rounded-xl shadow-lg">
                <FaMoneyBillWave className="text-lg md:text-xl text-white" />
              </div>
            </div>
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#70C5D7]/20">
              <p className="text-xs text-[#005482]/60">Successful transactions</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#005482]/10 to-transparent p-4 md:p-6 rounded-xl border border-[#005482]/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs md:text-sm text-[#005482]/70 font-medium mb-1">Total Students</p>
                <h3 className="text-xl md:text-3xl font-bold text-[#005482]">{stats.totalStudent || 0}</h3>
              </div>
              <div className="bg-[#005482] p-2 md:p-2.5 rounded-xl shadow-lg">
                <FaUserGraduate className="text-lg md:text-xl text-white" />
              </div>
            </div>
            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#005482]/20">
              <p className="text-xs text-[#005482]/60">Enrolled learners</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-[#70C5D7]/20 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-2 md:space-x-3">
                <FaChartBar className="text-lg md:text-xl text-[#005482]" />
                <h3 className="text-lg md:text-xl font-bold text-[#005482]">Overview by Numbers</h3>
              </div>
              <div className="text-xs md:text-sm text-[#005482]/60">
                {period.charAt(0).toUpperCase() + period.slice(1)} Data
              </div>
            </div>
            <div className="h-[250px] md:h-[300px]">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-[#70C5D7]/20 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-2 md:space-x-3">
                <FaChartPie className="text-lg md:text-xl text-[#DA3A60]" />
                <h3 className="text-lg md:text-xl font-bold text-[#005482]">Distribution Analysis</h3>
              </div>
              <div className="text-xs md:text-sm text-[#005482]/60">
                Percentage Split
              </div>
            </div>
            <div className="h-[250px] md:h-[300px]">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>

          {/* Line Chart - Full Width */}
          <div className="bg-white rounded-xl shadow-sm border border-[#70C5D7]/20 p-4 md:p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center space-x-2 md:space-x-3">
                <FaChartLine className="text-lg md:text-xl text-[#FCBB45]" />
                <h3 className="text-lg md:text-xl font-bold text-[#005482]">Trend Analysis</h3>
              </div>
              <div className="text-xs md:text-sm text-[#005482]/60">
                Growth Pattern
              </div>
            </div>
            <div className="h-[250px] md:h-[300px]">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;