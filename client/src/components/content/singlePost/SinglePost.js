
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import {ImageResize } from '@ckeditor/ckeditor5-image/src/imageresize';

import parse from "react-html-parser";
import "./singlepost.css";
import "@ckeditor/ckeditor5-theme-lark"

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:8000/api/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  
  const [postbody, setPostBody] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/posts/" + path);
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
      await axios.put(`/api/posts/${post._id}`, {
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

  const handleCKeditorState = (e, editor) => {
    const data = editor.getData();
    console.log("from SinglePost - hello");
    console.log(data);
    setPostBody(data)
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
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
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
          
        )}

        {updateMode ? (
          <div className="ckeditor">
            <label>Content</label>
              <CKEditor
                editor={ClassicEditor}
                onReady={(editor) => {
                  console.log("editor is ready", editor);
                }}
                data={postbody}
                config={{
                  ckfinder: { uploadUrl: "http://localhost:8000/api/ckloads/uploads" },
                  types: ['png', 'jpeg']
                }}
                onChange={handleCKeditorState}
                // onChange={editChange}
              />
         </div>
          // <textarea
          //   className="singlePostBodyInput"  
          //   value={postbody}
          //   onChange={(e) => setPostBody(e.target.value)}
          // />
        ) : (
          //<p className="singlePostBody">{postbody}</p>
          <div>
            <br />
            {parse(postbody)}  
          </div>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        {/* // test - here is where you would insert the additional blog content. */}
        <br />
        
        {/* // test */}
      </div>
    </div>
  );
}