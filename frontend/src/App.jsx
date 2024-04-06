import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LandPage from "./Pages/LandPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import DisplayResult from "./Pages/DisplayResult";
import AuthPage from "./Pages/AuthPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import GiveDetailsPage from "./Pages/GiveDetailsPage";
import { useAuthContext } from "./context/AuthContextProvider";
import CustomAlert from "./components/CustomAlert";
import NgoPage from "./Pages/NgoPage";
import AddFoodPage from "./Pages/AddFoodPage";
import Request from "./Pages/Request";
import VolunteerDisplay from "./Pages/VolunteerDisplay";
import ViewMyCart from "./Pages/ViewMyCart";
import MyCart from "./Pages/MyCart";

function App() {
  const { isAuthenticated } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<LandPage />} />
          <Route path="/login" element={<SignupPage />} />
          <Route path="/registerPage" element={<GiveDetailsPage />} />
          <Route path="/displayResult/:id" element={<DisplayResult />} />
          <Route path="/NgoPage/:id" element={<NgoPage />} />
          <Route path="/Volunteer/:id" element={<VolunteerDisplay />} />
          <Route path="/addfoodpage" element={<AddFoodPage />} />
          <Route path="/request/:id" element={<Request />} />
          <Route path="/ViewMyCart/:id" element={<ViewMyCart />} />
          <Route path="/Cart/:id" element={<MyCart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
