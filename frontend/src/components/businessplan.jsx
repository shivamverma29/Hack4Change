import React, { useState } from "react";
import { useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaTools, FaLightbulb, FaProjectDiagram } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineNumber } from "react-icons/ai";

const Businessplan = () => {
  const [businessName, setBusinessName] = useState("");
  const [businessGuide, setBusinessGuide] = useState([]);
  const [loader, setLoader] = useState(false);
  const isLogin = useSelector((state) => state.auth.token);

  const fetchBusinessGuide = async () => {
    setLoader(true);
    const genAI = new GoogleGenerativeAI("AIzaSyCLzLgikraSgNptmvZrMsGx9kWkVKbDo90");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Provide a step-by-step guide on how to start a business called ${businessName}, including necessary resources and steps. Format the response in JSON.format as-{title: 'Starting a Laptop Repair Business', steps: Array(12)}
steps
: 
Array(12)
0
: 
{step: '1. Business Planning', description: 'Create a detailed business plan outlining your bus…d, marketing strategy, and financial projections.', resources: Array(3)}
1
: 
{step: '2. Legal Structure', description: 'Choose a legal structure for your business (sole p…and register it with the appropriate authorities.', resources: Array(3)}
2
: 
{step: '3. Obtain Necessary Licenses and Permits', description: 'Research and obtain any licenses, permits, or cert…to operate a laptop repair business in your area.', resources: Array(2)}
3
: 
{step: '4. Secure Funding', description: 'Determine your startup costs and secure funding th…gh personal savings, loans, grants, or investors.', resources: Array(3)}
4
: 
{step: '5. Choose a Location', description: 'Decide whether to operate from a physical location…tely, and if needed, secure a suitable workspace.', resources: Array(2)}
5
: 
{step: '6. Acquire Equipment and Supplies', description: 'Invest in necessary equipment and supplies, includ…software, replacement parts, and repair stations.', resources: Array(3)}
`;
    const response = await model.generateContent(prompt);
    const jsonString = extractJsonString(response.response.text());
    const datajson = JSON.parse(jsonString);
    console.log(datajson);
    setBusinessGuide(datajson.steps);
    setLoader(false);
  };

  function extractJsonString(str) {
    const regex = /```json([\s\S]*?)```/;
    const match = str.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto" style={{ width: "1000px", maxWidth: "10000rem" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Business Plan Generator</h1>
            </div>
            <div className="divide-y divide-gray-200">
              {isLogin ? (
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Enter your business name"
                      className="peer mb-5 placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    />
                    <label
                      htmlFor="businessName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Business Idea
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      className="bg-cyan-500 text-white rounded-md px-2 py-1"
                      onClick={fetchBusinessGuide}
                    >
                      Generate Plan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                  <p className="text-center text-red-500">Please login to generate a business plan</p>
                </div>
              )}
            </div>
          </div>
          {loader && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
              <HashLoader color="white" />
            </div>
          )}
          {businessGuide.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Business Plan for {businessName}</h2>
              <div className="space-y-6">
                {businessGuide.map((step, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 flex items-start"
                  >
                    <div className="mr-4">
                      {index % 3 === 0 && <FaTools className="text-3xl text-blue-500" />}
                      {index % 3 === 1 && <FaLightbulb className="text-3xl text-yellow-500" />}
                      {index % 3 === 2 && <FaProjectDiagram className="text-3xl text-green-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <AiOutlineNumber className="text-2xl text-gray-500 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-800">{`Step ${step.step}`}</h3>
                      </div>
                      <p className="text-gray-600 mb-2">{step.description}</p>
                      {step.resources && (
                        <div className="mt-2">
                          <FiCheckCircle className="text-xl text-green-500 mr-2" />
                          <span className="font-semibold text-gray-700">Resources:</span>
                          <ul className="ml-8 mt-1 list-disc text-gray-600">
                            {step.resources.map((resource, i) => (
                              <li key={i}>{resource}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Businessplan;
