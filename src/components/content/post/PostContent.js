import "./postcontent.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  
  // PUBLIC PATH created in the /api/index.js
 const path =process.env.REACT_APP_PROXY + "/api/images/";
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

        {/* Link to view the single_post_view.  /Route defined in App.js */}
        <Link to={`/cms/post/${post._id}`} className="link">
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