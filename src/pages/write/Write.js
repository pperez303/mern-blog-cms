import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [articleheader, setArticleHeader] = useState("");
  const [articlesubheader, setArticleSubHeader] = useState("");
  const [modulenumber, setModuleNumber] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      articleheader,
      articlesubheader,
      modulenumber,
      title,
      desc,
      postbody: "",
    };
    // Upload the image file if not null
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post(process.env.REACT_APP_PROXY + "/api/upload", data);
      } catch (err) {}
    }

    try {
      console.log("HELLO IM HERE")
      const res = await axios.post(process.env.REACT_APP_PROXY + "/api/posts", newPost);
      window.location.replace("/cms/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <span>
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </span>
          <span> &nbsp; Click the plus symble to get an image file</span>
        </div>
        
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Article Header"
            className="articleHeader"
            autoFocus={true}
            onChange={e=>setArticleHeader(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Article Sub Header"
            className="articleSubHeader"
            autoFocus={true}
            onChange={e=>setArticleSubHeader(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Module Number"
            className="moduleNumber"
            autoFocus={true}
            onChange={e=>setModuleNumber(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Title"
            className="articleTitle"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
          <div>

          </div>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}