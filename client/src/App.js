import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { useContext } from "react";

// Components
import NavBar from './components/common/nav/NavBar';
import { Context } from "./context/Context";

// Pages
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import SinglePostView from "./pages/single_post_view/SinglePostView";

function App() {
  
  const { user } = useContext(Context);
  //console.log('App.js user: ', user)
  
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={user ? <Home /> : <Register />}  />
        <Route exact path="/login" element={user ? <Home /> : <Login />} />
        <Route exact path="/post/:postId" element={<SinglePostView />} />
      </Routes>
    </Router>
  );
}

export default App;
