import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Nav from "./components/nav";
import Lms from "./components/lms";
import Guidex from "./components/guidex";
import Footer from "./components/footer";
import VideoUpload from "./components/VideoUpload";
import Poster from "./components/aiposter";
import Chatbot from "./components/chatbot";
import Crowd from "./components/crowd";
import Visuals from "./components/VIsuals";
import Register from "./components/register";
import Login from "./components/login";
import { ContextProvider } from "./components/context/StepContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Legal from "./components/legal/legal";
import Service from "./components/legal/service";
import InputForm from "./components/legal/inputForm";
function App() {
  return (
    <>
      <ContextProvider>
        <Nav />
        <Chatbot />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lms" element={<Lms />} />
            <Route path="/uploadvideo" element={<VideoUpload />} />
            <Route path="/guidex" element={<Guidex />} />
            <Route path="/poster" element={<Poster />} />
            <Route path="/crowd" element={<Crowd />} />
            <Route path="/dashboard" element={<Visuals />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/service/:id" element={<Service />} />
            <Route path="/form/:id" element={<InputForm />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
        <Footer></Footer>
      </ContextProvider>
    </>
  );
}

export default App;
