import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageOne from "./pages/page1";
import PageTwo from "./pages/page2/page2";

import DoctorDashBoard from "./components/DoctorDashBoard";

import AdminDashBoard from "./components/AdminDashBoard";
import RegistrationPage from "./components/registerpage";
function App() {
  return (
    /* <>
      <RegistrationPage />
    </>*/
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/patient" element={<PageTwo />} />
        <Route path="/doctor" element={<DoctorDashBoard />} />
        <Route path="/admin" element={<AdminDashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
