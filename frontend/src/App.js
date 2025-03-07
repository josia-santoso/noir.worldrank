import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";  
import Signup from "./pages/signup"; 
import LogoPage from "./pages/logo"; // Import LogoPage component

function App() {
  return (
    <Router>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LogoPage />} /> {/* Set LogoPage as the default route */}
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
