import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

// Pages
import About from "./pages/about/About";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
