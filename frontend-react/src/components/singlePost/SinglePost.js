
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./singlepost.css";


export default function SinglePost() {
  const location = useLocation();
  console.log(location)
  const path = location.pathname.split("/")[2];
  console.log(path)
  const [post, setPost] = useState({});
  const PubFolder = "http://localhost:8000/api/images/";
  //const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const getPost = async () => {
      console.log('In useEffect')
      const res = await axios.get("/api/posts/" + path);
      console.log('After useEffect')
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      //setPostBody(res.data.postbody);
      console.log(res)
    };
    getPost();
  }, [path]);

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
      
        {post.photo && (
          <img src={PubFolder + post.photo} alt="" className="singlePostImg" />
        )}
        <h1 className="singlePostTitle">{title} </h1>
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
        <p className="singlePostDesc">{desc}</p>
        {/* // test - here is where you would insert the additional blog content. */}
        <br />
        
        {/* // test */}
      </div>
    </div>
  );
}