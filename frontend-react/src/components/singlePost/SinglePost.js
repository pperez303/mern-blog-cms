
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
//import parse from "react-html-parser";
import "./singlepost.css";


export default function SinglePost() {
  const location = useLocation();
  console.log(location)
  const path = location.pathname.split("/")[2];
  console.log(path)
  const [post, setPost] = useState({});
  const PF = "http://localhost:8000/images/";
  //const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [postbody, setPostBody] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      {console.log('In useEffect')}
      const res = await axios.get("/api/posts/" + path);
      {console.log('After useEffect')}
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      //setPostBody(res.data.postbody);
      //console.log(res)
      // test postbody-----------------------------------------
      setPostBody(res.data.postbody)
      // test postbody------------------------------------------
    };
    getPost();
  }, [path]);


  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {/* // test - here is where you would insert the additional blog content. */}
        <br />
        
        {/* // test */}
      </div>
    </div>
  );
}