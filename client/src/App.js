import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { useContext } from "react";
//import dotenv from "dotenv";

// Components
import NavBar from './components/common/nav/NavBar';
import { Context } from "./context/Context";

// Pages
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import SinglePostView from "./pages/single_post_view/SinglePostView";
import Write from "./pages/write/Write";
//dotenv.config();  

function App() {
  console.log("PROXY = ", process.env.REACT_APP_PROXY)
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
        <Route exact path="/profile" element={user ? <Profile /> : <Register />}  />
        <Route exact path="/write" element={user ? <Write /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
