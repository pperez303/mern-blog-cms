
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import "./singlepost.css";


export default function SinglePost() {
  const location = useLocation();
  console.log(location)
  const path = location.pathname.split("/")[2];
  console.log(path)
  const [post, setPost] = useState({});
  const PubFolder = "http://localhost:8000/api/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [postbody, setPostBody] = useState("");
  const [updateMode, setUpdateMode] = useState(false);


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

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
        // test postbody
        postbody
        // test postbody
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  const editChange = (e, editor) => {
    const data = editor.getData()
     setPostBody(data)
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
      
        {post.photo && (
          <img src={PubFolder + post.photo} alt="" className="singlePostImg" />
        )}
        <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
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
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
          
        )}
        <br />
        
        {/* // test */}
      </div>
    </div>
  );
}