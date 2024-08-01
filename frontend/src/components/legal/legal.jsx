import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { StepContext } from "../context/StepContext";

import { Typography } from "@material-tailwind/react";

function Legal() {
  const context = useContext(StepContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data on component mount
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://127.0.0.1:5000/api/services")
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-500">
      <div className="py-12">
        <Typography
          variant="h2"
          color="white"
          className="font-bold text-4xl text-center mb-2"
        >
          Tired of making legal documents?
        </Typography>
        <Typography color="white" className="font-normal text-center mb-6">
          This is your one-stop destination to get all your queries resolved!
        </Typography>

        <div className="max-w-3xl mx-auto px-3">
          <Typography
            color="white"
            className="font-light text-center text-lg mb-10"
          >
            Now seamlessly draft your legal documents without knowing any legal
            jargon. Just answer some easy questions and get your documents
            drafted with custom editable features. Not sure which document to
            choose? Ask our AI-powered Chatbot!!
          </Typography>
        </div>

        {data.length > 0 && (
          <Typography
            variant="h2"
            color="white"
            className="font-bold text-4xl text-center mb-6"
          >
            Available Documents
          </Typography>
        )}
        {data.length > 0 ? (
          <section className="text-black w-full">
            <div className="container mx-auto px-5 py-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.map((service) => (
                  <Link
                    to={`/service/${service.service_id}`}
                    className="cursor-pointer transform transition ease-in-out hover:scale-105 duration-300"
                    key={service.service_id}
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl">
                      <img
                        className="w-full h-48 object-cover object-center"
                        src={service.img_link}
                        alt="service"
                      />
                      <div className="p-6">
                        <h2 className="text-lg font-bold mb-3">
                          {service.service_name}
                        </h2>
                        <p className="text-sm text-gray-700">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-4xl text-white font-semibold">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Legal;
