import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import StandartClean from "./components/StandartClean";
import CraftsMan from "./pages/CraftsMan";
import UserOrders from "./pages/UserOrders";
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
          <Route path="/category/general/order" element={<StandartClean />} />
          <Route path="/category/standart/order" element={<StandartClean />} />
          <Route path="/category/craftsman/order" element={<CraftsMan />} />
          <Route path="/user_orders" element={<UserOrders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
