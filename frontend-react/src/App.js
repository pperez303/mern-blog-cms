import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

// Components
import NavBar from './components/common/nav/NavBar';

// Pages
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from './pages/contact/Contact';
import SinglePostView from "./pages/single_post_view/SinglePostView";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/post/:postId" element={<SinglePostView />} />
      </Routes>
    </Router>
  );
}

export default App;
