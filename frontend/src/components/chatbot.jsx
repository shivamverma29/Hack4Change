import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "tailwindcss/tailwind.css";
import { HfInference } from "@huggingface/inference";

// Web Speech API
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US"; // Set recognition language to English

const synth = window.speechSynthesis;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const inference = new HfInference("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");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message to chat
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const botResponseChunks = [];

      for await (const chunk of inference.chatCompletionStream({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [{ role: "user", content: input }],
        max_tokens: 500,
      })) {
        const botMessageChunk = chunk.choices[0]?.delta?.content || "";
        botResponseChunks.push(botMessageChunk);

        // Update the UI with the streaming response
        const streamingResponse = botResponseChunks.join("");
        setMessages([
          ...newMessages,
          { sender: "bot", text: streamingResponse },
        ]);
      }

      const botResponse = botResponseChunks.join("");

      // Convert bot response to speech
      const utterance = new SpeechSynthesisUtterance(botResponse);
      utterance.lang = "en-US"; // Set TTS language to English
      synth.speak(utterance);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "An error occurred. Please try again later." },
      ]);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    recognition.start();
    recognition.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript;
      setInput(voiceInput);
      setIsListening(false);
    };
    recognition.onspeechend = () => {
      recognition.stop();
      handleSend(); // Automatically send the message after voice input
      setIsListening(false);
    };
    recognition.onerror = (event) => {
      setIsListening(false);
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default action (e.g., form submission)
      handleSend();
    }
  };

  return (
    <div>
      <button
        className="fixed bottom-5 right-5 p-3 rgb(102 118 146) text-white rounded-full focus:outline-none"
        onClick={toggleChat}
        style={{ zIndex: 1000, backgroundColor: "rgb(102 118 146)" }}
      >
        {isOpen ? "Close" : "💬"}
      </button>
      {isOpen && (
        <div
          className="fixed bottom-20 right-5 w-80 h-96 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg flex flex-col"
          style={{ zIndex: 1000 }}
        >
          <div className=" text-white p-3 rounded-t-lg">Chatbot</div>
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-300 flex items-center">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type or use voice..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 px-3 py-2 text-white rounded-md"
              style={{ backgroundColor: "rgb(102 118 146)" }}
            >
              Send
            </button>
            {/* Uncomment to enable voice input button */}
            {/* <button onClick={handleVoiceInput} className="ml-2 p-2 bg-gray-200 rounded-full">
              {isListening ? "🎤 Listening..." : "🎤"}
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
