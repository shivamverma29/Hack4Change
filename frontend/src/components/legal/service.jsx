import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
// import "./Service.css";
import { StepContext } from "../context/StepContext";

function Service() {
  const initialCards = [
    { title: "Lease Deed", category: "Contracts" },
    { title: "Rent Agreement", category: "Important" },
    { title: "Allowance", category: "Important" },
    { title: "Allowance", category: "Important" },
    { title: "Maintainance", category: "Contracts" },
    { title: "Acceptance", category: "New" },
    // Add more card data here
  ];

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [serviceName, setServiceName] = useState("");

  const context = useContext(StepContext);

  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = Array.from(
    new Set(initialCards.map((card) => card.category))
  );

  const filteredCards = selectedCategory
    ? initialCards.filter((card) => card.category === selectedCategory)
    : initialCards;

  const handleFilter = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    context.setStep1(false);
    context.setStep2(false);
    context.setStep3(false);
    context.setStep4(false);

    fetch(`http://127.0.0.1:5000/api/forms?service_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setServiceName(data[0].service_name);
    }
  }, [data]);

  const handleClick = () => {
    context.setStep1(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 h-full w-full object-cover z-0"
      >
        <source
          src="https://res.cloudinary.com/dyxnmjtrg/video/upload/v1694668584/Purple_Blue_Modern_Tech_Business_Conference_Video_d5vf0l.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-50">
        <h1 className="text-5xl font-bold text-white mb-10">{serviceName}</h1>

        <div className="flex justify-center w-full mb-10">
          <ul className="steps text-white">
            <li className={`step ${context.step1 ? "step-success" : ""}`}>
              Select Legal Document
            </li>
            <li className={`step ${context.step2 ? "step-success" : ""}`}>
              Fill Information
            </li>
            <li className={`step ${context.step3 ? "step-success" : ""}`}>
              Edit Document
            </li>
            <li className={`step ${context.step4 ? "step-success" : ""}`}>
              Download Document
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-72">
          {data.length > 0 ? (
            data.map((form) => (
              <Link
                to={"/form/" + form.form_id}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-6 text-center hover:bg-opacity-20 transition duration-300"
                key={form.form_id}
                onClick={handleClick}
              >
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 mb-4 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                  <p className="text-2xl font-semibold text-white mb-4">
                    {form.form_name}
                  </p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                    View Document
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-4xl text-white font-bold">
              Contact the Lawyer...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Service;
