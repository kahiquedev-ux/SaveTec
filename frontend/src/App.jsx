import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Mp3Page from "./pages/Mp3Page";
import Mp4Page from "./pages/Mp4Page";

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1f1f1f",
            color: "#fff",
            border: "1px solid #ff0000",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mp3" element={<Mp3Page />} />
        <Route path="/mp4" element={<Mp4Page />} />
      </Routes>
    </Router>
  );
}

export default App;
