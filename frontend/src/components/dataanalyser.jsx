import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Analyzer() {
  const [data, setData] = useState([]);
  const [chartsData, setChartsData] = useState({});
  const [startupType, setStartupType] = useState('');
  const [filter, setFilter] = useState('Monthly');
  const [dashboardGenerated, setDashboardGenerated] = useState(false);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      setData(sheet);
      if (startupType) generateChartsData(sheet);
    };
    reader.readAsBinaryString(file);
  };

  // Generate charts based on data and filter
  const generateChartsData = (data) => {
    let charts = {};

    if (startupType === 'Fintech') {
      charts.mau = {
        labels: getLabels(data),
        datasets: [{
          label: 'Monthly Active Users',
          data: getMonthlyActiveUsers(data),
          backgroundColor: '#4F46E5',
        }],
      };
      charts.transactionVolume = {
        labels: getLabels(data),
        datasets: [{
          label: 'Transaction Volume',
          data: getTransactionVolume(data),
          backgroundColor: '#F87171',
        }],
      };
    } else if (startupType === 'E-commerce') {
      charts.monthlyOrders = {
        labels: getLabels(data),
        datasets: [{
          label: 'Monthly Orders',
          data: getMonthlyOrders(data),
          backgroundColor: '#34D399',
        }],
      };
      charts.productSales = {
        labels: getProductLabels(data),
        datasets: [{
          label: 'Product Sales',
          data: getProductSales(data),
          backgroundColor: '#FBBF24',
        }],
      };
      charts.conversionRate = {
        labels: getLabels(data),
        datasets: [{
          label: 'Conversion Rate',
          data: getConversionRate(data),
          backgroundColor: '#60A5FA',
        }],
      };
      charts.aov = {
        labels: getLabels(data),
        datasets: [{
          label: 'Average Order Value',
          data: getAov(data),
          backgroundColor: '#F97316',
        }],
      };
      charts.returnRate = {
        labels: getLabels(data),
        datasets: [{
          label: 'Return Rate',
          data: getReturnRate(data),
          backgroundColor: '#EC4899',
        }],
      };
      charts.bounceRate = {
        labels: getLabels(data),
        datasets: [{
          label: 'Bounce Rate',
          data: getBounceRate(data),
          backgroundColor: '#6EE7B7',
        }],
      };
      charts.timeSpent = {
        labels: getLabels(data),
        datasets: [{
          label: 'Average Time Spent',
          data: getTimeSpent(data),
          backgroundColor: '#3B82F6',
        }],
      };
      charts.cac = {
        labels: getLabels(data),
        datasets: [{
          label: 'Customer Acquisition Cost',
          data: getCac(data),
          backgroundColor: '#9333EA',
        }],
      };
      charts.cltv = {
        labels: getLabels(data),
        datasets: [{
          label: 'Customer Lifetime Value',
          data: getCltv(data),
          backgroundColor: '#10B981',
        }],
      };
      
    }
    else if (startupType === 'Healthcare') {
        charts.numberConsultations = {
          labels: getLabels(data),
          datasets: [{
            label: 'Number of Consultations',
            data: getNumberConsultations(data, selectedField), // Pass selected field
            backgroundColor: '#60A5FA',
          }],
        };
        // ... other charts for Healthcare
      } else if (startupType === 'Edtech') {
        charts.registrations = {
          labels: getLabels(data),
          datasets: [{
            label: 'Registrations',
            data: getRegistrations(data, selectedField), // Pass selected field
            backgroundColor: '#FBBF24',
          }],
        };
        // ... other charts for Edtech
      } else if (startupType === 'Foodtech') {
        charts.dailyOrders = {
          labels: getLabels(data),
          datasets: [{
            label: 'Daily Orders',
            data: getDailyOrders(data, selectedField), // Pass selected field
            backgroundColor: '#9333EA',
          }],
        };
    }
        
    
    // Add more startup types here...

    setChartsData(charts);
  };

  // Utility functions for extracting data
  const getLabels = (data) => {
    const labels = filter === 'Monthly' ? ['Jan', 'Feb', 'Mar', 'Apr'] : ['Q1', 'Q2', 'Q3', 'Q4'];
    return labels;
  };

  const getMonthlyActiveUsers = (data) => {
    // Extract and return monthly active users from data
    return data.map(row => row['Monthly Active Users'] || 0);
  };

  const getTransactionVolume = (data) => {
    // Extract and return transaction volume from data
    return data.map(row => row['Transaction Volume'] || 0);
  };

  const getMonthlyOrders = (data) => {
    // Extract and return monthly orders from data
    return data.map(row => row['Monthly Orders'] || 0);
  };

  const getProductLabels = (data) => {
    // Extract and return product labels from data
    return [...new Set(data.map(row => row['Product Name']))];
  };

  const getProductSales = (data) => {
    // Extract and return product sales from data
    const productSales = {};
    data.forEach(row => {
      const product = row['Product Name'];
      const sales = row['Product Sales'] || 0;
      productSales[product] = (productSales[product] || 0) + sales;
    });
    return Object.values(productSales);
  };

  const getConversionRate = (data) => {
    // Extract and return conversion rate from data
    return data.map(row => row['Conversion Rate'] || 0);
  };

  const getAov = (data) => {
    // Extract and return average order value from data
    return data.map(row => row['Average Order Value'] || 0);
  };

  const getReturnRate = (data) => {
    // Extract and return return rate from data
    return data.map(row => row['Return Rate'] || 0);
  };

  const getBounceRate = (data) => {
    // Extract and return bounce rate from data
    return data.map(row => row['Bounce Rate'] || 0);
  };

  const getTimeSpent = (data) => {
    // Extract and return average time spent on website from data
    return data.map(row => row['Average Time Spent'] || 0);
  };

  const getCac = (data) => {
    // Extract and return customer acquisition cost from data
    return data.map(row => row['Customer Acquisition Cost'] || 0);
  };

  const getCltv = (data) => {
    // Extract and return customer lifetime value from data
    return data.map(row => row['Customer Lifetime Value'] || 0);
  };

  // Update charts when filter changes
  useEffect(() => {
    if (data.length > 0 && startupType) {
      generateChartsData(data);
    }
  }, [filter, startupType, data]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">InnovStack Analyzer Dashboard</h1>

      {/* Startup Type Selection */}
      <div className="mb-8 flex justify-center">
        {['Fintech', 'E-commerce', 'Healthcare', 'Edtech', 'Foodtech', 'Tech & Software'].map((type) => (
          <button
            key={type}
            onClick={() => {
              setStartupType(type);
              setDashboardGenerated(false);
            }}
            className={`mx-2 px-6 py-3 rounded-lg shadow-md transition duration-200 ${
              startupType === type
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* File Upload */}
      <div className="mb-8 text-center">
        <label className="block mb-4 text-lg font-semibold">Upload Excel File:</label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Generate Dashboard Button */}
      <div className="mb-8 text-center">
        <button
          onClick={() => {
            generateChartsData(data);
            setDashboardGenerated(true);
          }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Generate Dashboard
        </button>
      </div>

      {/* Filter Controls */}
      {dashboardGenerated && (
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setFilter('Monthly')}
            className={`mx-2 px-4 py-2 rounded-lg ${
              filter === 'Monthly' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setFilter('Quarterly')}
            className={`mx-2 px-4 py-2 rounded-lg ${
              filter === 'Quarterly' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            Quarterly
          </button>
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dashboardGenerated && startupType && (
          <>
            {chartsData.mau && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Monthly Active Users</h2>
                <Line data={chartsData.mau} />
              </div>
            )}
            {chartsData.transactionVolume && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Transaction Volume</h2>
                <Line data={chartsData.transactionVolume} />
              </div>
            )}
            {chartsData.monthlyOrders && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Monthly Orders</h2>
                <Line data={chartsData.monthlyOrders} />
              </div>
            )}
            {chartsData.productSales && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Product Sales</h2>
                <Bar data={chartsData.productSales} />
              </div>
            )}
            {chartsData.conversionRate && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Conversion Rate</h2>
                <Line data={chartsData.conversionRate} />
              </div>
            )}
            {chartsData.aov && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Average Order Value</h2>
                <Line data={chartsData.aov} />
              </div>
            )}
            {chartsData.returnRate && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Return Rate</h2>
                <Line data={chartsData.returnRate} />
              </div>
            )}
            {chartsData.bounceRate && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Bounce Rate</h2>
                <Line data={chartsData.bounceRate} />
              </div>
            )}
            {chartsData.timeSpent && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Average Time Spent</h2>
                <Line data={chartsData.timeSpent} />
              </div>
            )}
            {chartsData.cac && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Customer Acquisition Cost</h2>
                <Line data={chartsData.cac} />
              </div>
            )}
            {chartsData.cltv && (
              <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Customer Lifetime Value</h2>
                <Line data={chartsData.cltv} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Analyzer;