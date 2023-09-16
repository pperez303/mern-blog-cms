import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  
  // public path created in the /api/index.js
 const path = "http://localhost:8000/images/";
 console.log(path)

  return (
    <div className="post">
      {post.photo && <img className="postImg" src={path + post.photo} alt="" />}
      <div className="postInfo">
        {/*<div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
          </div> */}
        <Link to={`/api/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}