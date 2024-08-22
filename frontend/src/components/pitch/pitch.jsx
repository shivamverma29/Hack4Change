// src/Chat.js
import { HfInference } from "@huggingface/inference";
import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";

const inference = new HfInference("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"); // Replace with your actual Hugging Face API key

const shark = [
  [
    {
      role: "pitcher",
      text: "Hello Sharks, my name's Jeff Cranny. I'm seeking $200,000 for a 20% equity in my company Lock Straps. Sharks, theft can happen to anyone anywhere at any time. Maybe you're into desert sports like dirt bikes, quads, or UTVs or maybe you're more into the water sports kind of thing, big or small, Lock Straps locks it all.",
    },
    {
      role: "pitcher",
      text: "They have a stainless steel cable embedded inside the strap with two durable combination locking carabiners on both ends of the straps, making them almost impossible to cut.",
    },
    {
      role: "pitcher",
      text: "Sharks, we have a saying around here: Lock Straps are kind of like jock straps; they help protect your junk.",
    },
    {
      role: "pitcher",
      text: "AOD, you look pretty strong. Why don't you come up here and try cutting one of our Lock Straps?",
    },
    {
      role: "pitcher",
      text: "So this is a traditional style cable lock. Go ahead, give it a nice and big, nice and big. All in. Kaboom, Kaboom, two for two. Let's see how you do on the Lock Strap. Go ahead, do it any way you want to do it. Come on, get it done.",
    },
    {
      role: "pitcher",
      text: "Can we see the um... Can us strap that he... Yeah, actually, I have samples for you guys.",
    },
    {
      role: "pitcher",
      text: "Great. Why can't he cut through this? Because it's much thinner than the other steel cable. The cable cutters are designed to cut steel. This has steel and cloth, two different forms.",
    },
    {
      role: "pitcher",
      text: "Is this proprietary? Putting this cloth around a steel cable? Someone owns a patent with putting a steel inside a strap that's not new. Somebody owns a patent on a locking combination carabiner.",
    },
    {
      role: "pitcher",
      text: "I put it all together and patented the whole thing together. Did you get? I got a design patent, a design patent, and a trademark.",
    },
    {
      role: "pitcher",
      text: "So, we've made about 135,000 in sales in the first year. Things were looking great. We were going into our second year. We were already at 175,000, and Home Depot found interest in it.",
    },
    {
      role: "pitcher",
      text: "But we didn't have the type of money to do a Home Depot purchase order, so I partnered with a company to fill the purchase order.",
    },
    {
      role: "pitcher",
      text: "My factory wasn't big enough to make the straps fast enough to meet their orders, so I allowed the company that I went with to make the straps for me.",
    },
    {
      role: "pitcher",
      text: "We launched, we went out on Home Depot's shelves, but they got carried away. They made them too fast and you tie your motorcycle down just like that and they would slip. So they all came back.",
    },
    {
      role: "pitcher",
      text: "I made the teeth inside this piece roll the strap so the harder it would pull, the more it would dig into the strap. When they redesigned it, they decided to make the teeth redesigned it in China.",
    },
    {
      role: "pitcher",
      text: "So you went 1.9 million because I didn't do the purchase order. They did, they went in the hole.",
    },
    {
      role: "pitcher",
      text: "Wait, Home Depot or the person you partnered with?",
    },
    {
      role: "pitcher",
      text: "The person I partnered with.",
    },
    {
      role: "pitcher",
      text: "So you were still involved or did you just step away completely and just say, 'Send me my commission check'?",
    },
    {
      role: "pitcher",
      text: "I just waited for my royalty checks to come and you left it to them completely.",
    },
    {
      role: "pitcher",
      text: "How many got sold actually before they got recalled?",
    },
    {
      role: "pitcher",
      text: "I don't have that number because it's their number and we shook hands and kind of went our own ways, but maybe what we learned there and we don't know it because we don't have the data is actually this product wasn't going to sell well anyways.",
    },
    {
      role: "pitcher",
      text: "So you have a product that you've made and right now what do you have in the market?",
    },
    {
      role: "pitcher",
      text: "Right now what we have in the market is the single Carabiner by itself.",
    },
    {
      role: "pitcher",
      text: "How much have I sold since when?",
    },
    {
      role: "pitcher",
      text: "Since anytime. Because these aren't defective.",
    },
    {
      role: "pitcher",
      text: "From Home Depot I don't have that number because they still have the PO and all.",
    },
    {
      role: "pitcher",
      text: "Are they selling? They're not selling well and I believe it's because of the fact and you're still getting a royalty check even though it's a small check.",
    },
    {
      role: "pitcher",
      text: "Yes.",
    },
    {
      role: "pitcher",
      text: "Is this product a dog? In other words, there's nothing wrong with this; there's nothing slipping; it's in stores; nobody's buying.",
    },
    {
      role: "pitcher",
      text: "Yes or no?",
    },
    {
      role: "pitcher",
      text: "Yeah.",
    },
    {
      role: "pitcher",
      text: "I pick myself up, get back up on my feet, get my company back up on my feet, and get rocking and rolling. It's my only choice I have.",
    },
    {
      role: "shark",
      text: "Good luck, Jeff. I can't get any data out of you. Horrible presentation. I'm out.",
    },
    {
      role: "shark",
      text: "It concerns me that you left your product and now you want us to come back in with your product again. It's not a very appetizing story. So for those reasons, I'm out.",
    },
    {
      role: "shark",
      text: "I can relate with your story because, you know, I played 23 years in the major leagues. I'm fifth all time in the history of the game in strikeouts. That means I have a PhD at failing, failing, but I also have a masters of getting back up.",
    },
    {
      role: "shark",
      text: "But what I was hoping that when you get a second bite at the Apple, you have a clear story and a clear path and I still do not hear that from you. I'm out.",
    },
    {
      role: "shark",
      text: "I've never seen an entrepreneur that creates a product, any product, where they aren't completely in love with it. Their hands are all over it. They know every single thing about it.",
    },
    {
      role: "shark",
      text: "Even if you said to that company, 'Put the money up, take over,' the true spirit of an entrepreneur that's created their baby is, 'Let me see that sample, let me know exactly what's going on, I want to see the packaging.'",
    },
    {
      role: "shark",
      text: "They want their hands in every single bit of it and you just, you let it go and you didn't watch it like it was your baby. I am willing if you are willing to do a deal where it becomes your baby.",
    },
    {
      role: "shark",
      text: "It pains me, but I'm out. Good luck, buddy.",
    },
  ],
  [
    {
      role: "pitcher",
      text: "Hi sharks, my name is Caitlyn Maentel and I'm here seeking $500,000 in exchange for 10% equity in my company, P Pantry.",
    },
    {
      role: "pitcher",
      text: "Sharks, I know you like talking numbers, so let me throw some at you. In the United States, we waste 54 million tons of food every single year.",
    },
    {
      role: "pitcher",
      text: "Can you believe that normally all of this gorgeous produce would have been tossed or the fiber left over from juicing fruits and vegetables? This too normally goes unloved.",
    },
    {
      role: "pitcher",
      text: "Talk about a missed opportunity. Well, sharks, the madness stops with us because P Pantry has developed a new way to snack with impact.",
    },
    {
      role: "pitcher",
      text: "We take the thousands of pounds of organic produce that would otherwise go unloved every single week and upcycle them into a line of real veggie chips that are made from, you guessed it, real fresh vegetables.",
    },
    {
      role: "pitcher",
      text: "Not corn, not potato starch, and certainly not grains for that matter. We're spreading the good vibes only with the delicious and nutritious snack that's packed with flavor and fiber, all the while tackling one of our most pressing environmental issues—food waste.",
    },
    {
      role: "pitcher",
      text: "Sharks, it's crunch time! Who's ready to dig in and make a deal?",
    },
    {
      role: "shark",
      text: "I love it! We have our sea salt, salt vinegar, jalapeno lime, and barbecue, but the things to note with the pul chips—they're 100% vegan, they're grain-free, they're gluten-free, and the best part about it is every serving has 5 grams of fiber, meaning that a bag of chips is nearly your day's serving of fiber.",
    },
    {
      role: "shark",
      text: "I'm amazed! They're so good, they're so delicious.",
    },
    {
      role: "pitcher",
      text: "So happy you love them. I could tell you're a woman of impeccable taste because you're wearing my Good American fit for Success jumpsuit. Well done!",
    },
    {
      role: "shark",
      text: "Lots of kissing up going on, just saying! But even better than the jumpsuit, these taste delicious.",
    },
    {
      role: "shark",
      text: "How are you getting the starchy consistency that I would expect from a grain? 'Cause it's there.",
    },
    {
      role: "pitcher",
      text: "It's just balancing the fresh ingredients that we use, which is the fresh vegetables. We also add cassava flour and okara flour, which is another upcycled ingredient made from BCT.",
    },
    {
      role: "shark",
      text: "There's no gluten in these at all?",
    },
    {
      role: "pitcher",
      text: "No gluten, no grains. If you look at the back of a veggie chip in a normal grocery store, the first ingredient you'll probably see is potato starch or dried potato flakes.",
    },
    {
      role: "pitcher",
      text: "So we opted to create a version that has no potatoes either.",
    },
    {
      role: "shark",
      text: "Can you give me the stack on pricing from the cost per bag, wholesale pricing, and retail? Just run through that.",
    },
    {
      role: "pitcher",
      text: "One bag costs $1.70 to produce. We wholesale for $3.24, and we're on the shelf at $4.99 to $5.49.",
    },
    {
      role: "shark",
      text: "How did you come up with this idea?",
    },
    {
      role: "pitcher",
      text: "I got really interested in sustainability when I was in eighth grade. My mom took me to see An Inconvenient Truth, the Al Gore documentary.",
    },
    {
      role: "pitcher",
      text: "Environmental Studies was my degree, but I had a big 'aha' moment when a friend of mine was juicing organic produce. I saw the handfuls of pulp and the tiniest amount of juice. She said she usually throws it away.",
    },
    {
      role: "pitcher",
      text: "So I took it home and made my first batch of carrot cookies.",
    },
    {
      role: "shark",
      text: "Carrot cookies?",
    },
    {
      role: "pitcher",
      text: "Yes, carrot cookies. The idea was honestly just something I pitched in a class project, and my professors thought it deserved to exist in the world. We actually got a grant from my university to get started after graduating.",
    },
    {
      role: "shark",
      text: "Where are you getting the pulp from now, at scale?",
    },
    {
      role: "pitcher",
      text: "We work with two of the biggest national juice brands in the country. For them, there's so much organic byproduct that they have to pay a composter to take it off their hands or pay for animal feed.",
    },
    {
      role: "pitcher",
      text: "If we can grow and absorb most of that byproduct, then it's actually saving them money.",
    },
    {
      role: "shark",
      text: "Do you pay for the veggies?",
    },
    {
      role: "pitcher",
      text: "We cover the cost of labor because they'd have to pay someone else to take it away.",
    },
    {
      role: "shark",
      text: "So what are you doing in sales?",
    },
    {
      role: "pitcher",
      text: "We finished last year with just under $250,000 in sales. This calendar year, we'll finish with just under $500,000.",
    },
    {
      role: "shark",
      text: "What are you going to make on that? $20,000 net?",
    },
    {
      role: "pitcher",
      text: "We are profitable. 70% of our business is retail. We're in about 600 doors, and about 20% of that is through third-party e-commerce sites like Thrive Market and Imperfect Produce.",
    },
    {
      role: "shark",
      text: "But you're asking me to pay you 10 times sales for a new snacking company that hasn't really established distribution yet outside of a couple of trials. Can you speak to the valuation?",
    },
    {
      role: "pitcher",
      text: "Our ARR in the last quarter puts us at about $700,000. The problem for us has been that less than 5% of our revenue in each of our channels has been spent on marketing.",
    },
    {
      role: "shark",
      text: "I have a lot of experience in this space, including with Pipcorn. It's really competitive. I have to say though, I think the idea that you turn someone else's garbage into a successful business is amazing.",
    },
    {
      role: "pitcher",
      text: "Thank you.",
    },
    {
      role: "shark",
      text: "Not only that, but you have such passion and a purpose. Unfortunately, I think you're going to have a tall mountain to climb in this competitive space, so for those reasons, I'm out.",
    },
    {
      role: "pitcher",
      text: "Thank you, Barbara. It was so nice to meet you.",
    },
    {
      role: "shark",
      text: "How much is in your bank account currently?",
    },
    {
      role: "pitcher",
      text: "About $220,000.",
    },
    {
      role: "shark",
      text: "Wow, so what's the lowest you've ever been at?",
    },
    {
      role: "pitcher",
      text: "I don't know if I should tell you.",
    },
    {
      role: "shark",
      text: "We've all been negative, so don't feel bad.",
    },
    {
      role: "pitcher",
      text: "I've definitely seen it go down to like $1,000. The issue for us is these cash flow cycles. We want to do more promotions and get people to try our product.",
    },
    {
      role: "shark",
      text: "Maybe now would be a great time for you to say to the other sharks, 'Give me some offers, let's go.'",
    },
    {
      role: "shark",
      text: "Would you like me to go first?",
    },
    {
      role: "pitcher",
      text: "Yes, thank you.",
    },
    {
      role: "shark",
      text: "So here's what I think. I'm very passionate about this space because I'm already invested in it. You'd benefit from that, but it’s a tough category. And I’m sorry, I’m not going to make an offer, I’m out.",
    },
    {
      role: "pitcher",
      text: "Thank you.",
    },
    {
      role: "shark",
      text: "I want to be very careful how I say this. I believe you're going to be successful. However, I do think you're a little early on your journey for where I think you should be valuation-wise.",
    },
    {
      role: "pitcher",
      text: "Right.",
    },
    {
      role: "shark",
      text: "For that reason, I'm out. I don't think I can compete against Pipcorn, but I also believe there are a lot of players in this space, and that's what concerns me.",
    },
    {
      role: "pitcher",
      text: "Thank you. Thanks so much.",
    },
  ],
];

const Pitch = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [userExchanges, setUserExchanges] = useState(0);
  const [llmExchanges, setLlmExchanges] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [responseAnalyses, setResponseAnalyses] = useState([]); // State to store response analyses
  const inputRef = useRef(null);
  const sendButtonRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const rec = new webkitSpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-US";
    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    rec.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
    rec.onend = () => {
      setIsListening(false);
    };

    setRecognition(rec);
  }, []);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setVideoStream(stream);
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    startWebcam();

    // Cleanup function to stop the video stream
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  const analyzePitch = async (conversation) => {
    setLoading(true);
    setError(null);
    try {
      const response = await inference.chatCompletionStream({
        model: "mistralai/Mistral-Nemo-Instruct-2407",
        messages: [
          {
            role: "user",
            content:
              "Please analyze the following conversation between a user pitching their business and an investor. Provide a report in JSON format with the following keys: 'pitchQuality', 'businessKnowledge', 'strengths', 'weaknesses', and 'overallImpression'. Each key should have a short text value summarizing the analysis. GIVE ONLY IN OBJECT FORMAT. Here is the conversation:" +
              JSON.stringify(conversation),
          },
        ],
        max_tokens: 500,
      });

      let analysisText = "";
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || "";
        analysisText += content;
      }

      try {
        const analysisObject = JSON.parse(analysisText);
        console.log(analysisObject);

        setAnalysis(analysisObject);

        // Update the responseAnalyses state
        setResponseAnalyses((prevAnalyses) => [
          ...prevAnalyses,
          {
            userMessage: conversation[conversation.length - 1].text,
            analysis: analysisObject,
          },
        ]);
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

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const responseChunks = inference.chatCompletionStream({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          {
            role: "user",
            content:
              "You are a seasoned angel investor. YOUR RESPONSE SHOULD NOT BE OF MORE THAN 50 WORDS, KEEP YOUR RESPONSES SHORT AND ONLY ASK 1-2 QUESTIONS IN A SINGLE RESPONSE. Start your response with responding to the user's input. If you think there is any statement in the user's input that is interesting or can affect their startup, ask about that. Don't thank the user every time. And behave like a human. If it's your first response, then ask about the startup. Here's the user's input: " +
              input +
              ". IF THE USER ENTERS SOMETHING GIBBERISH JUST RETURN 'GIVE A VALID ANSWER'. Respond as if you were evaluating the user in a real investor setting. Begin by asking specific questions to understand the business, its operations, market, and potential. Ask only one question in one response. Use the following Shark Tank script as a reference for the tone, flow, and type of questions to ask, but avoid using names." +
              shark +
              " Do not use any name. Maintain a focus on understanding the business model, revenue streams, and growth potential entered by the user after asking. As the conversation progresses, inquire about the company's valuation, challenge it if necessary according to the messages provided below. The following is your past conversation with the user, use it as a reference to continue the conversation - " +
              messages +
              ". Limit each side to a maximum of 11 exchanges i.e. the size of the messages object should be 11, so try to finish up the pitching in that many rounds.",
          },
        ],
        max_tokens: 500,
      });

      let llmResponse = "";
      for await (const chunk of responseChunks) {
        const content = chunk.choices[0]?.delta?.content || "";
        llmResponse += content;
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { ...prevMessages[prevMessages.length - 1], text: llmResponse },
        ]);
      }

      const updatedMessages = [
        ...messages,
        userMessage,
        { text: llmResponse, sender: "llm" },
      ];

      setMessages(updatedMessages);

      const newUserExchanges = userExchanges + 1;
      const newLlmExchanges = llmExchanges + 1;
      setUserExchanges(newUserExchanges);
      setLlmExchanges(newLlmExchanges);

      if (newUserExchanges >= 5 && newLlmExchanges >= 6) {
        analyzePitch(updatedMessages);
      } else {
        // Analyze pitch after every user response
        analyzePitch(updatedMessages);
      }
    } catch (error) {
      console.error("Error fetching LLM response:", error);
      const errorMessage = {
        text: "Error fetching response from LLM.",
        sender: "llm",
      };
      setMessages([...messages, userMessage, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto mt-10 mb-12 bg-white shadow-lg rounded-lg border border-gray-200 flex h-screen">
      {/* Main Container */}
      <div className="flex-1 flex flex-col">
        {/* Webcam */}
        <div className="relative w-full h-80 bg-gray-300 mb-4">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            ref={videoRef}
          />
        </div>
        {/* Chat */}
        <div className="flex-1 overflow-y-auto">
          <div className="border border-gray-300 p-6 rounded-lg bg-gray-100 min-h-[300px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-4 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white"
                  } max-w-md`}
                >
                  <strong
                    className={`block text-sm font-semibold ${
                      message.sender === "user" ? "text-white" : "text-gray-200"
                    }`}
                  >
                    {message.sender === "user" ? "You" : "Investor"}
                  </strong>
                  <p className="mt-1">{message.text}</p>
                </div>
              </div>
            ))}
            {isLoading && <div className="text-gray-500 mt-4">Loading...</div>}
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t border-gray-300 p-4">
          <div className="flex items-center">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ref={inputRef}
            />
            <button
              onClick={handleSend}
              className="ml-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={sendButtonRef}
            >
              Send
            </button>
          </div>
          <div className="mt-2 flex justify-end">
            <button
              onClick={isListening ? stopListening : startListening}
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isListening ? "Stop Listening" : "Start Listening"}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Box */}
      <div className="w-96 bg-gray-100 p-4 border-l border-gray-300 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Response Analysis
        </h2>
        {analysis && (
          <div className="analysis-container bg-white shadow-lg rounded-lg p-6 max-w-xs mx-auto mt-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Pitch Analysis Report
            </h2>

            <div className="analysis-section mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Pitch Quality:
              </h3>
              <p className="text-gray-600">{analysis.pitchQuality}</p>
            </div>

            <div className="analysis-section mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Business Knowledge:
              </h3>
              <p className="text-gray-600">{analysis.businessKnowledge}</p>
            </div>

            <div className="analysis-section mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Strengths:
              </h3>
              {Array.isArray(analysis.strengths) &&
              analysis.strengths.length > 0 ? (
                <ul className="list-disc ml-5 text-gray-600">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No strengths listed</p>
              )}
            </div>

            <div className="analysis-section mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Weaknesses:
              </h3>
              {Array.isArray(analysis.weaknesses) &&
              analysis.weaknesses.length > 0 ? (
                <ul className="list-disc ml-5 text-gray-600">
                  {analysis.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No weaknesses listed</p>
              )}
            </div>

            <div className="analysis-section">
              <h3 className="text-xl font-semibold text-gray-700">
                Overall Impression:
              </h3>
              <p className="text-gray-600">{analysis.overallImpression}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pitch;
