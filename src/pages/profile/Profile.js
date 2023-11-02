import "./profile.css";
import Sidebar from "../../components/common/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Profile() {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Define the context consumer
  const { user, dispatch } = useContext(Context);

  // initialize the profile properties
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  
  console.log('USER RECORD = ', user)

  console.log('document values initialized')
  
  //const publicFolder = "http://localhost:8000/api/images/"
  const publicFolder = process.env.REACT_APP_PROXY + "/api/images/"

  // Receive the form data if the validation is successfull
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    console.log('at profile handleSubmit')
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      _id: user._id,
      username,
      email,
      password,
    };
    console.log('Profile.js handleSubmit')
    if (file) {                                                                 // Process the profile picture if selected by the user.
      console.log('Profile if (file true', file)
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(process.env.REACT_APP_PROXY + "/api/upload", data);
      } catch (err) {
        setError(true)
      }
    }
    try {
      const res = await axios.put(process.env.REACT_APP_PROXY + "/api/users/" + user._id, updatedUser);
      setSuccess(true);
      console.log("UPDATE SUCCESS")
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      
    } catch (err) {
      console.log('update FAILURE', updatedUser.password)
      setError(true)
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  console.log('FILE = ', file)
  return (
    <div className="profile">
      <div className="profileWrapper">
        <div className="profileTitle">
          <span className="profileUpdateTitle">Update Your Account</span>
          <span className="profileDeleteTitle">Delete Account</span>
        </div>
        <form className="profileForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="profilePP">
            <img
              src={file ? URL.createObjectURL(file) : publicFolder+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="profilePPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="profileSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}

          {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong! Maybe a bad password.</span>}

        </form>
      </div>
      <Sidebar />
    </div>
  );
}