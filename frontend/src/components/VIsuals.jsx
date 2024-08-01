import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto"; // Import Chart.js components

import data from "../dataset/byStates.json"; // Adjust path as necessary

const Visuals = () => {
  const [selectedState, setSelectedState] = useState("Delhi");
  const [selectedYear, setSelectedYear] = useState("2021"); // Default year
  const [chartData, setChartData] = useState(() =>
    getDataForStateAndYear("Delhi", "2021")
  );
  const [states, setStates] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    console.log("Imported Data:", data);

    const uniqueStates = Array.from(new Set(data.map((entry) => entry.State)));
    setStates(uniqueStates);

    const uniqueYears = Array.from(new Set(data.map((entry) => entry.Year)));
    setYears(uniqueYears);

    setChartData(getDataForStateAndYear(selectedState, selectedYear));
  }, [selectedState, selectedYear]);

  function getDataForStateAndYear(state, year) {
    console.log("Filtering Data for:", { state, year });
    const stateData = data.filter(
      (entry) =>
        entry.State === state && parseInt(entry.Year) === parseInt(year) // Ensure year is a number
    );

    console.log(`Filtered Data for ${state} in ${year}:`, stateData);

    // Calculate total count
    const totalCount = stateData.reduce((sum, entry) => sum + entry.Count, 0);

    // Prepare data with "Others" category
    const industryData = stateData.reduce((acc, entry) => {
      if (entry.Count >= totalCount * 0.02) {
        acc[entry.Industry] = (acc[entry.Industry] || 0) + entry.Count;
      } else {
        acc["Others"] = (acc["Others"] || 0) + entry.Count;
      }
      return acc;
    }, {});

    const labels = Object.keys(industryData);
    const counts = Object.values(industryData);

    return {
      barChartData: {
        labels: labels.length > 0 ? labels : ["No Data"],
        datasets: [
          {
            label: "Number of Startups",
            data: counts.length > 0 ? counts : [0],
            backgroundColor: "rgba(54, 162, 235, 0.2)", // Blue color
            borderColor: "rgba(54, 162, 235, 1)", // Blue color
            borderWidth: 1,
          },
        ],
      },
      pieChartData: {
        labels: labels.length > 0 ? labels : ["No Data"],
        datasets: [
          {
            label: "Number of Startups",
            data: counts.length > 0 ? counts : [0],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)", // Blue color
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)", // Blue color
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    };
  }

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setChartData(getDataForStateAndYear(state, selectedYear));
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    setChartData(getDataForStateAndYear(selectedState, year));
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen mb-14">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Startup Visuals</h1>

      <div className="mb-6">
        <label
          htmlFor="state-select"
          className="block text-lg font-medium text-blue-700 mb-2"
        >
          Select State:
        </label>
        <select
          id="state-select"
          value={selectedState}
          onChange={handleStateChange}
          className="bg-white border border-blue-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        >
          {states.length > 0 ? (
            states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))
          ) : (
            <option>No States Available</option>
          )}
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="year-select"
          className="block text-lg font-medium text-blue-700 mb-2"
        >
          Select Year:
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={handleYearChange}
          className="bg-white border border-blue-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
        >
          {years.length > 0 ? (
            years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))
          ) : (
            <option>No Years Available</option>
          )}
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-[45%]">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Bar Chart
          </h2>
          <Bar
            data={chartData.barChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `Count: ${context.raw}`,
                  },
                },
              },
            }}
          />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-[35%]">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Pie Chart
          </h2>
          <Pie
            data={chartData.pieChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: ${context.raw}`,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Visuals;
