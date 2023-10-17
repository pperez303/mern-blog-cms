//
import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

// If a user can't remember their password, then 1) delete the user record in MongoDB and 2) have the user register with the same User Name.
export default function Login() {

  // Setup hooks to save the username and passwed entered on the form <input> tags
  const userRef = useRef();
  const passwordRef = useRef();

  // Get the dispatch and isFetching variables from the Context.Provider as defined in Context.js.
  // useContext allows you to consume the context data.
  // The 'dispatch' function comes from the Reducer and allows us to call it here.
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });                    // call the dispatch() function in the Context object.
    try {
      const res = await axios.post("/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>

        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
        />

        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          minLength={3}
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}