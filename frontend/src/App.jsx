import React from "react";
import FormPage from "./components/FormPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import EditPage from "./components/EditPage";

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Router>
        <Routes>
          <Route path="/addForm" element={<FormPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
