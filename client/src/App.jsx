import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import StandartClean from "./components/StandartClean";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route index="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/category/standart/order" element={<StandartClean />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
