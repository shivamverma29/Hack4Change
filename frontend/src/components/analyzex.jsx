import React, { useState } from "react";
import { Bar, Pie, Line, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import * as XLSX from "xlsx";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
// Replace the Hugging Face Inference API initialization with your Gemini API setup
// Assume you have a function `geminiFetch` that handles requests to the Gemini API

const Analyzex = () => {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function extractJsonString(str) {
    const regex = /```json([\s\S]*?)```/;
    const match = str.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
    return null;
  }

  const geminiFetch = async ({ inputs, max_tokens = 500 }) => {
    try {
        const genAI = new GoogleGenerativeAI("AIzaSyCTNzf1grV73snVGpnkg4zt4W8kW4v8GCE");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const prompt = inputs
  
      const response = await model.generateContent(prompt);
        console.log(response.response.text());
      // Assuming the response contains a list of text choices
      return response.response.text();
    } catch (error) {
      console.error("Gemini API request failed:", error);
      throw new Error("Failed to fetch data from Gemini API");
    }
  };
  
      // Assuming the response data is in the format { choices: [...] }

  

  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const fetchComponentCode = async () => {
    setLoading(true);
    setError(null);
    setChartData(null);

    try {
      const inputs = `Return a JSON object with the necessary fields and values to display various charts using react-chartjs-2,including Bar,line,pie,charts,Doughnut,PolarArea and radar charts. Ensure that the data is structured as follows:
      {"charts": [{"type": "chart_type","data": { "labels": ["Label1", "Label2", "Label3"], "datasets": [{"label": "Dataset 1", "data": [10, 20, 30], "backgroundColor": ["#ff6384", "#36a2eb", "#ffce56"]}] }, "options": { "responsive": true,"scales": { "y": { "beginAtZero": true }}}}]}`;

      // Replace the API call with a request to the Gemini API
      const response = await geminiFetch({
        inputs,
        max_tokens: 500,
      });


      // Attempt to clean and parse the response
      try {
        // Remove any leading or trailing non-JSON content
        const cleanedText = extractJsonString(response);
        const generatedData = JSON.parse(cleanedText);
        console.log(generatedData);
        setChartData(generatedData);
      } catch (jsonError) {
        console.error("JSON Parsing Error:", jsonError);
        setError("The response was not in the expected format.");
      }
    } catch (error) {
      console.error("Error fetching analysis:", error);
      setError("Error fetching analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Data Visualization App
      </h1>
      <div className="flex flex-col items-center space-y-4">
        <input
          type="file"
          className="p-2 border border-gray-300 rounded-md"
          onChange={handleFileUpload}
        />
        <button
          onClick={fetchComponentCode}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Generate Charts
        </button>
      </div>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {chartData && chartData.charts && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Generated Charts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chartData.charts.map((chart, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow">
                {chart.type === "bar" && (
                  <Bar data={chart.data} options={chart.options} />
                )}
                {chart.type === "pie" && (
                  <Pie data={chart.data} options={chart.options} />
                )}
                {chart.type === "line" && (
                  <Line data={chart.data} options={chart.options} />
                )}
                {chart.type === "doughnut" && (
                  <Doughnut data={chart.data} options={chart.options} />
                )}
                {chart.type === "radar" && (
                  <Radar data={chart.data} options={chart.options} />
                )}
                {chart.type === "polarArea" && (
                  <PolarArea data={chart.data} options={chart.options} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analyzex;
