
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../../context/Context";
import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from 'ckeditor5-custom-build'


import parse from "html-react-parser";
import "./singlepost.css";
import "./content-styles.css";
//import "@ckeditor/ckeditor5-theme-lark"
//import {Animation1} from "../../../assets/animations/animation1/Animation1";



export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[3];                   // select the post id value 
  
  console.log('FROM SinglePost REACT_APP Proxy= ', process.env.REACT_APP_PROXY)

  const PF = process.env.REACT_APP_PROXY + "/api/images/";      // set the public folder

  const { user } = useContext(Context)
  const [post, setPost] = useState({});
  const [file, setImageFile] = useState("");

  const [articleheader, setArticleHeader] = useState("");
  const [articlesubheader, setArticleSubHeader] = useState("");
  const [modulenumber, setModuleNumber] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  
  const [postbody, setPostBody] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const [photo, setPhoto] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(process.env.REACT_APP_PROXY + "/api/posts/" + path);
      setPost(res.data);
      console.log("OLD IMAGE is ", res.data.photo)

      setArticleHeader(res.data.articleheader);
      setArticleSubHeader(res.data.articlesubheader);
      setModuleNumber(res.data.modulenumber);

      setTitle(res.data.title);
      setDesc(res.data.desc);
      console.log('postbody: ', res.data.postbody)
  
      setPostBody(res.data.postbody)

      setPhoto(res.data.photo)      
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {                                      // add code to remove image, if not null, from the the local image store.
    try {
      await axios.delete(process.env.REACT_APP_PROXY + `/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/cms/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    const updatePost = {
      username: user.username,
      articleheader,
      articlesubheader,
      modulenumber,
      title,
      desc,
      postbody
    }
    
    if (file) {
      
      const data =new FormData();
      const filename = Date.now() + file.name;

      data.append("name", filename);
      data.append("file", file);
      updatePost.photo = filename;      
      console.log("At before try", data)

      // Upload the new image
      try {
        await axios.post(process.env.REACT_APP_PROXY + "/api/upload", data);
      } catch (err) {}

      // Remove the old image
      try {
        const oldimage = {image: photo}
        console.log('OLDIMAGE =', oldimage)
        await axios.post(process.env.REACT_APP_PROXY + "/api/removeoldimage/", oldimage);
      } catch (err) {}
    }

    try {
      console.log("updatePost= ", updatePost)
      await axios.put(process.env.REACT_APP_PROXY + `/api/posts/${post._id}`, updatePost);
      setUpdateMode(false)
    } catch (err) {}

    
    
  };

  // const editChange = (e, editor) => {
  //   const data = editor.getData()
  //    setPostBody(data)
  // };

  const handleCKeditorState = (e, editor) => {
    const data = editor.getData();
    console.log("from SinglePost - hello");
    console.log(data);
    setPostBody(data)
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">    {/** add ck-content to manage the ckeditor css classes */}
      {console.log('PublicFolder PF: ', PF)}
      {console.log('Post Photo: ', post.photo)}
       {post.photo && <img src={PF + post.photo} alt="" className="singlePostImg" />}


        {updateMode ? (
          
          <div>
          <div className="writeFormGroup">
          <span>
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </span>
          <span> &nbsp; Click the plus symble to get an image file</span>
        </div>

            <div>
              <label>Article Header</label>
              <input
                type="text"
                value={articleheader}
                className="editHeader"
                autoFocus
                onChange={(e) => setArticleHeader(e.target.value)}
              />
            </div>

            <div>
              <label>Article Sub Header</label>
              <input
                type="text"
                value={articlesubheader}
                className="editSubHeader"
                autoFocus
                onChange={(e) => setArticleSubHeader(e.target.value)}
              />
            </div>
            <div>
              <label>Module Nunber</label>
              <input
                type="text"
                value={modulenumber}
                className="editModuleNumber"
                autoFocus
                onChange={(e) => setModuleNumber(e.target.value)}
              />
            </div>

            <div>
              <label>Post Title</label>
              <input
                type="text"
                value={title}
                className="editTitle"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
          </div>
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
                  image: {
                    toolbar: [
                      'imageStyle:inline',
                      'imageStyle:block',
                      'imageStyle:side',
                      '|',
                      'toggleImageCaption'
                    ]
                  },
                  ckfinder: { uploadUrl: process.env.REACT_APP_PROXY + "/api/ckloads/uploads" },
                  types: ['png', 'jpeg'],
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
         <div className="ck-content">                                           {/** applies to the contetn-styles.css */}
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
