import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as quillToWord from "quill-to-word";
import { toast } from "react-toastify";
import { StepContext } from "../context/StepContext";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import "daisyui/dist/full.css";

function InputForm() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [content, setContent] = useState("");
  const [displayForm, setDisplayForm] = useState(true);
  const [displaySteps, setDisplaySteps] = useState(true);
  const quillRef = useRef(null);
  const navigate = useNavigate();
  const context = useContext(StepContext);
  const [displayHome, setDisplayHome] = useState(false);

  const [category, setCategory] = useState([]);
  const [activeCategory, setActiveCategory] = useState(
    category.length > 0 ? category[0].id : 1
  );

  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    var flag = 0;

    for (let i = 1; i < data.length; i++) {
      const ques = data[i];
      if (formData[ques.ques_id] === "") {
        toast.error("Please answer all the questions before submitting!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
        });
        flag = 1;
        break;
      }
    }

    if (flag === 0) {
      window.scrollTo(0, 0);
      context.setStep2(true);
      const obj = formData;
      obj["form_id"] = data[0].form_id;
      const formDataJsonString = JSON.stringify(obj);
      setDisplayForm(false);

      fetch(`http://127.0.0.1:5000/api/final-content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formDataJsonString,
      })
        .then((response) => response.json())
        .then((data) => {
          setContent(data.content);
        });
    }
  };

  const saveText = async () => {
    window.scrollTo(0, 0);
    context.setStep3(true);
    context.setStep4(true);
    setDisplayHome(true);

    const contents = quillRef.current.getEditor().getContents();
    const quillToWordConfig = {
      exportAs: "blob",
    };
    const doc = await quillToWord.generateWord(contents, quillToWordConfig);
    const url = window.URL.createObjectURL(doc);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "file.docx";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast.success("Document downloaded successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://127.0.0.1:5000/api/form-details?form_id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then((res) => {
        var filteredObjects = res.filter((obj) =>
          obj.hasOwnProperty("category_name")
        );
        setCategory(filteredObjects);
        const arr = ["form_id", "category_id"];
        filteredObjects = res.filter((obj) =>
          arr.some((key) => obj.hasOwnProperty(key))
        );
        setData(filteredObjects);

        const initialFormData = {};
        for (let i = 1; i < filteredObjects.length; i++) {
          const obj = filteredObjects[i];
          initialFormData[obj.ques_id] = "";
        }
        setFormData(initialFormData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (category.length > 0) {
      setActiveCategory(category[0].id);
    }
  }, [category]);

  const handleQuillChange = (html) => {
    context.setEdit((prev) => prev + 1);

    if (context.edit > 1) {
      context.setStep3(true);
    }

    setContent(html);
  };

  const navHome = () => {
    navigate("/");
  };

  const handleClick = (category) => {
    setActiveCategory(category.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundColor: "#1e3a8a",
      }}
    >
      <div className="flex justify-center items-center pt-32 -mb-32 pb-20">
        <ul className="steps steps-vertical md:steps-horizontal w-full">
          <li className="step step-primary text-white font-semibold">
            Select Legal Document
          </li>
          <li
            className={`step ${
              context.step2 && "step-primary"
            } text-white font-semibold`}
          >
            Fill Information
          </li>
          <li
            className={`step ${
              context.step3 && "step-primary"
            } text-white font-semibold`}
          >
            Edit Document
          </li>
          <li
            className={`step ${
              context.step4 && "step-primary"
            } text-white font-semibold`}
          >
            Download Document
          </li>
        </ul>
      </div>

      <div className="container mx-auto">
        {data.length > 0 && (
          <h1 className="text-white font-bold text-4xl pt-24 text-center mb-12">
            {data[0].form_name}
          </h1>
        )}
        {displayForm ? (
          <form onSubmit={handleSubmit} className="pb-36">
            <Tabs value={activeCategory} className="sm:px-10 px-2 pt-12">
              <TabsHeader>
                {category.length > 0 &&
                  category.map((c) => (
                    <Tab
                      className="sm:mx-3 mx-1 sm:text-lg text-xs font-normal"
                      onClick={() => handleClick(c)}
                      key={c.id}
                      value={c.id}
                    >
                      {c.category_name}
                    </Tab>
                  ))}
              </TabsHeader>
              <TabsBody>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  {data.map(
                    (ques, index) =>
                      index !== 0 &&
                      ques.category_id === activeCategory && (
                        <TabPanel key={ques.ques_id} value={ques.category_id}>
                          <div className="md:max-w-lg w-full">
                            <label
                              htmlFor="name"
                              className="text-white text-lg font-bold"
                            >
                              {ques.ques_label}
                            </label>
                            <input
                              type={ques.ques_type}
                              name={ques.ques_id}
                              className="w-full rounded-md border text-black border-gray-300 px-3 py-2 mt-2"
                              required
                              value={formData[ques.ques_id] || ""}
                              onChange={handleInputChange}
                              style={{
                                border: "1px solid rgba(255, 255, 255, .25)",
                                backgroundColor: "rgba(255, 255, 255, 0.75)",
                                boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.25)",
                                backdropFilter: "blur(15px)",
                              }}
                              defaultValue={
                                Object.keys(formData).length > 0 &&
                                Object.keys(ques).length > 0
                                  ? formData[ques.ques_id]
                                  : ""
                              }
                            />
                          </div>
                        </TabPanel>
                      )
                  )}
                </div>
              </TabsBody>
            </Tabs>

            {category.length > 0 &&
              activeCategory === category[category.length - 1].id && (
                <div className="flex justify-center w-full p-7">
                  <button
                    type="submit"
                    className="btn btn-primary p-4 text-lg font-bold"
                  >
                    Submit
                  </button>
                </div>
              )}
          </form>
        ) : (
          <div className="px-6 mt-12">
            <h1 className="text-white font-bold text-3xl text-center mb-3">
              Edit Document
            </h1>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleQuillChange}
              className="preserve-linebreaks bg-white text-black rounded-lg shadow-md"
              ref={quillRef}
              id="editor"
            />
            <div className="flex justify-center mt-6">
              <button
                onClick={saveText}
                className="btn btn-success p-4 text-lg font-bold"
              >
                Save
              </button>
              {displayHome && (
                <button
                  onClick={navHome}
                  className="btn btn-error p-4 ml-7 text-lg font-bold"
                >
                  Home
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputForm;
