import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Selecting from "./pages/Selecting";
import Camera from "./pages/Camera";
import Result from "./pages/Result";
import ErrorPage from "./pages/ErrorPage";
import { useRef, useState } from "react";
import type { VariantData } from "./Types";
import Test from "./pages/Test";

function App() {
  const [savedFile, setSavedFile] = useState<Blob>();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Selecting />} />
        <Route path="/camera" element={<Camera onSaveFile={(file) => {setSavedFile(file)}}/>} />
        <Route path="/result" element={<Result savedFile={savedFile}/>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="test" element={<Test/>} />
      </Routes>
    </Router>
  );
}

export default App;
