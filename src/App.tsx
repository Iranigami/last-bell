import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Selecting from "./pages/Selecting";
import Camera from "./pages/Camera";
import Result from "./pages/Result";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<Selecting />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/result" element={<Result />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
