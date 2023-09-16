import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

// Components
import NavBar from './components/nav/NavBar';

// Pages
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from './pages/contact/Contact';
import Single_Post from "./pages/single_post/Single_Post";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/post/:postId" element={<Single_Post />} />
      </Routes>
    </Router>
  );
}

export default App;
