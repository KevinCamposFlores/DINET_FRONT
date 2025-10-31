import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import UploadFile from "./UploadFile";
import LocationSkus from "./LocationSkus";
import StoreProducts from "./StoreProducts";
import Home from "./Home";
import StoreReport from "./StoreReport";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideNavbar = location.pathname === "/login";

  return (
    <>
     {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/uploadFile" element={<UploadFile />} />
        <Route path="/locationskus" element={<LocationSkus />} />
        <Route path="/storeproducts" element={<StoreProducts />} />
        <Route path="/storereport" element={<StoreReport />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
