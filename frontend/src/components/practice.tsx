import React, { useEffect, useState } from "react";
import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import styled from "styled-components";
import Webcam from "react-webcam";
import { MdCopyAll } from "react-icons/md";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Loader } from "./Loader";
import { GoogleGenerativeAI } from "@google/generative-ai";

type ParsedQuestion = {
  question: string;
  category: string;
  type: string;
};

export const Practice = () => {
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
  const [text, setText] = useState("");
  const [isCopied, setCopied] = useClipboard(text);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFeed, setShowFeed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const techStack = searchParams.get("tectStack");
  const [questions, setQuestions] = useState<Array[]>([]);
  const [render, setRender] = useState<boolean>(false);
  const [feedBack, setFeedBack] = useState<string>("");
  const [businessIdea, setBusinessIdea] = useState<string>("");
  const [isInterviewStarted, setIsInterviewStarted] = useState<boolean>(false);
  const [parsedQuestions, setParsedQuestions] = useState<ParsedQuestion[]>([]);

  const start = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stop = () => {
    SpeechRecognition.stopListening();
  };

  const handleClear = () => {
    resetTranscript();
  };

  const handleTurnoff = () => {
    SpeechRecognition.abortListening();
  };

  const handleNextQuestion = () => {
    setShowFeed(false);
    resetTranscript();
    setCurrentIndex((prev) => (prev === questions?.length - 1 ? 0 : prev + 1));
    window.speechSynthesis.cancel();
  };

  const handleprevious = () => {
    setShowFeed(false);
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    setRender(true);
    axios
      .get(`http://localhost:5000/questions/get?techStack=MERN`)
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function extractJsonString(str) {
    const regex = /```json([\s\S]*?)```/;
    const match = str.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
    return null;
  }

  const handleStartInterview = async () => {
    if (businessIdea.trim() === "") {
      alert("Please provide a brief about your business idea.");
      return;
    }
    setIsInterviewStarted(true);
    const genAI = new GoogleGenerativeAI("AIzaSyCLzLgikraSgNptmvZrMsGx9kWkVKbDo90");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let promptques = `Consider yourself a interviewer for an entrepreneur Generate an json object of questions based on the following business idea: ${businessIdea} for practice and feedback.let the structure be as follows:{
    "question": "What is the unique value proposition of your gaming hub? What sets it apart from other existing platforms or communities?",
    "category": "Value Proposition",
    "type": "open"
  },`;

    const responseques = await model.generateContent(promptques);
    const parsedres = JSON.parse(extractJsonString(responseques.response.text()));
    setParsedQuestions(parsedres);
    start(); // Start listening after setting the parsed questions
  };

  const handleSubmit = async () => {
    setShowFeed(true);
    setIsLoading(true);
    SpeechRecognition.stopListening();
    const genAI = new GoogleGenerativeAI("AIzaSyCLzLgikraSgNptmvZrMsGx9kWkVKbDo90");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let prompt = `Consider yourself as an interviewer for a full stack web developer. This is the business idea: "${businessIdea}". This is the question: "Tell me about your business idea" and this is my answer: "${transcript}". Please provide feedback on this answer, evaluating it based on the following rubrics: Feedback for Subject Matter Expertise and Communication skills should contain ratings from 0 to 10. Do not mention that you are an AI model; just give feedback.generate the text in this format and generate new points on different line:
    1. Subject Matter Expertise:5/10
    The candidate shows no understanding of the business idea or how to articulate it
    2.Communication Skills:2/10 
    The answer is extremely brief and lacks clarity.`;

    const response = await model.generateContent(prompt);

    let feedback = response.response.text();
    setFeedBack(feedback);
    setIsLoading(false);

    const value = new SpeechSynthesisUtterance(feedback);
    window.speechSynthesis.speak(value);
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      {render && (
        <DIV>
          {!isInterviewStarted ? (
            <div className="relative py-3 mt-10 mb-12 sm:max-w-xl sm:mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
              <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                  <div>
                    <h1 className="text-2xl font-semibold">Pitch Practice</h1>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <form>
                      <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                        <div className="relative">
                          <input
                            autoComplete="off"
                            id="businessIdea"
                            name="businessIdea"
                            type="text"
                            value={businessIdea}
                            onChange={(e) => setBusinessIdea(e.target.value)}
                            className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                            placeholder="State"
                          />
                          <label
                            htmlFor="businessIdea"
                            className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                          >
                            Brief about Business Idea
                          </label>
                        </div>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={handleStartInterview}
                            className="bg-blue-500 text-white rounded-md px-2 py-1 flex justify-center items-center mx-auto"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : showFeed ? (
            <div className="feedback-container">
              <div className="feedback">
                <div>
                  <div className="student-answer">
                    <h1 className="student-answer-heading">Your Answer</h1>
                    <p>{transcript}</p>
                  </div>
                </div>
                <div className="chat-feedback">
                  {isLoading === false && (
                    <p className="feedback-heading">Feedback</p>
                  )}
                  {isLoading ? (
                    <div className="loader">
                      <Loader />
                    </div>
                  ) : (
                    <p>{feedBack}</p>
                  )}
                </div>
              </div>
              {isLoading ? null : (
                <div className="next-prev-container pb-9">
                  <button
                    disabled={isLoading}
                    className="next-Question-btn"
                    onClick={handleprevious}
                  >
                    Previous Question
                  </button>
                  <button
                    className="next-Question-btn"
                    onClick={handleNextQuestion}
                    disabled={isLoading}
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="question-and-cam-container">
                <div className="question-container">
                  <h1>
                    <b>Question {currentIndex + 1}:</b>
                  </h1>
                  <p className="question">
                    <b>
                      {parsedQuestions.length !== 0 &&
                        parsedQuestions[currentIndex].question}
                    </b>
                  </p>
                  <p className="category">
                    <b>
                      Category:
                      <br></br>
                      {parsedQuestions.length !== 0 &&
                        parsedQuestions[currentIndex].category}
                    </b>
                  </p>
                </div>
                <div className="cam-container">
                  <Webcam height="260px" />
                </div>
              </div>

              <div
                className="speech-text-container"
                onClick={() => setText(transcript)}
              >
                {transcript ? (
                  transcript
                ) : (
                  <h2 className="your_answer">
                    Click on Start button and start speaking and submit your
                    answer after completing ....
                  </h2>
                )}
              </div>
              <div className="btn-contianer pb-52">
                <div>
                  <button className="btn copy" onClick={setCopied}>
                    {isCopied ? "Copied!" : "Copy"}{" "}
                    <MdCopyAll className="copy-icon" />
                  </button>
                </div>
                <div>
                  <button className="btn" onClick={start}>
                    Start
                  </button>
                  <button className="btn stop" onClick={handleTurnoff}>
                    Stop
                  </button>
                  <button className="btn" onClick={handleClear}>
                    Clear
                  </button>
                  <button className="btn" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </DIV>
      )}
    </div>
  );
};

const DIV = styled.div`
  /* Styling remains the same as before */
  .speech-text-container {
    width: 90%;
    height: 250px;
    border: solid lightgray 1px;
    border-radius: 5px;
    margin: auto;
    margin-top: 10px;
    padding: 20px;
    text-align: start;
  }

  .question-and-cam-container {
    display: flex;
    width: 93%;
    margin: auto;
    height: 295px;
  }

  .question-container {
    width: 50%;
    text-align: left;
    padding: 20px;
  }

  .cam-container {
    width: 50%;
    display: flex;
    justify-content: right;
    padding-top: 30px;
  }

  .question {
    font-size: 18px;
    margin-left: 20px;
  }

  .your_answer {
    margin-left: 20px;
  }

  .btn-contianer {
    display: flex;
    justify-content: space-between;
    width: 94%;
    margin: auto;
  }

  .btn {
    padding: 10px 25px;
    border: solid lightgray 1px;
    margin: 10px 15px;
    border-radius: 5px;
    background-color: #5cdb94;
    background-color: #05396b;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    color: white;
    font-weight: 700;
  }

  .btn:hover {
    padding: 10px 25px;
    border: solid lightgray 1px;
    margin: 10px 15px;
    border-radius: 5px;
    background-color: #97afc6;
    color: white;
    font-weight: 700;
  }

  .copy {
    background-color: #5cdb94;
    font-weight: 900;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    display: flex;
    align-items: center;
  }

  .stop {
    background-color: #ff3d3d;
  }

  .stop:hover {
    background-color: #ddacac;
  }

  .copy-icon {
    font-size: 20px;
  }

  .feedback-container {
    padding: 20px;
    background-color: #0a2640;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .feedback {
    display: flex;
    justify-content: space-between;
  }

  .student-answer {
    width: 640px;
    height: 560px;
    border: solid lightgray 1px;
    background-color: white;
    text-align: left;
    padding: 0px 30px;
    background-color: #244361;
    color: white;
    border-radius: 5px;
    margin-right: 20px;
  }

  .chat-feedback {
    width: 700px;
    height: 560px;
    border: solid lightgray 1px;
    background-color: white;
    text-align: left;
    padding: 0px 30px;
    border-radius: 5px;
  }

  .student-answer-heading {
    color: #5cdb94;
  }

  .feedback-heading {
    font-size: 25px;
  }

  .next-Question-btn {
    padding: 10px 20px;
    margin: 10px;
    margin-top: 30px;
    border-radius: 3px;
    width: 200px;
    background-color: white;
    border: solid black 1px;
    background-color: #5cdb94;
    color: black;
    font-weight: 600;
  }

  .next-Question-btn:hover {
    padding: 10px 20px;
    margin: 10px;
    margin-top: 30px;
    border-radius: 3px;
    width: 200px;
    background-color: white;
    border: solid black 1px;
    background-color: white;
    color: black;
    font-weight: 600;
  }

  .Caution {
    font-size: 13px;
    border: solid red 1px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fac8c8;
  }

  .next-prev-container {
    display: flex;
  }

  .loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

