import React, { useState } from "react";
import { useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Poster() {
  const [companyName, setCompanyName] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [loader, setLoader] = useState(false);
  const [captions, setCaptions] = useState([]);
  const isLogin = useSelector((state) => state.auth.token);

  const generatePoster = async () => {
    setLoader(true);
    // const response = await fetch("http://localhost:5000/gen/generate-poster", {
    const response = await fetch("https://hack4change.onrender.com/gen/generate-poster", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyName, postDescription }),
    });
    const data = await response.json();
    const { generated_image } = data;

    setPoster(generated_image);
    setLoader(false);
    fetchCaptions(companyName, postDescription); // Fetch captions after generating poster
  };

  function extractJsonString(str) {
    const regex = /```json([\s\S]*?)```/;
    const match = str.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
    return null;
  }

  const fetchCaptions = async (companyName, postDescription) => {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyCLzLgikraSgNptmvZrMsGx9kWkVKbDo90"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate catchy captions for the following company and post: ${companyName} - ${postDescription}. Provide the captions in JSON format with keys 'captions'.`;
    const data = await model.generateContent(prompt);
    const datajson = JSON.parse(extractJsonString(data.response.text()));
    console.log(datajson);
    setCaptions(datajson.captions); // Assuming the API returns an array of captions under "captions" key
  };

  const downloadPoster = () => {
    const link = document.createElement("a");
    link.href = poster;
    link.download = "poster.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 min-w-1/2">
      <div
        className="relative py-3 sm:max-w-xl sm:mx-auto "
        style={{ width: "700px", maxWidth: "10000rem" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Poster Generator</h1>
            </div>
            <div className="divide-y divide-gray-200">
              {isLogin ? (
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter your company name"
                      className="peer mb-5 placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    />
                    <label
                      htmlFor="companyName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Company Name
                    </label>
                  </div>
                  <div className="relative">
                    <textarea
                      value={postDescription}
                      onChange={(e) => setPostDescription(e.target.value)}
                      className="peer placeholder-transparent h-10 w-full min-h-20 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Describe your post"
                      rows="4"
                    />
                    <label
                      htmlFor="postDescription"
                      className="absolute mb-5 left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Post Description
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      className="bg-cyan-500 text-white rounded-md px-2 py-1"
                      onClick={generatePoster}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                  <p className="text-center text-red-500">
                    Please login to generate a poster
                  </p>
                </div>
              )}
            </div>
          </div>
          {loader && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
              <HashLoader color="white" />
            </div>
          )}
          <div className="w-full flex justify-center">
            {poster && (
              <div className="mt-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Generated Poster
                </h2>
                <img
                  src={poster}
                  alt="Generated Poster"
                  className="border rounded-lg shadow-md mb-4"
                />
                <a
                  className="bg-green-500 text-white rounded-md px-4 py-2"
                  onClick={downloadPoster}
                  href={poster}
                >
                  Download Poster
                </a>
              </div>
            )}
          </div>
          {poster && captions.length > 0 && (
            <>
              <h1 className="flex justify-center text-center mt-7 text-2xl font-bold">
                Suggested Captions
              </h1>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {captions.map((caption, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg border border-gray-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {caption}
                    </h3>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Poster;
