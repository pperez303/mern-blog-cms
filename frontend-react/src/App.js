import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import NavBar from './components/nav/NavBar';

// Pages
import About from "./pages/about/About";
import Contact from './pages/contact/Contact';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
