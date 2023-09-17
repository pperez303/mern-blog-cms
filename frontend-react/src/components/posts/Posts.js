import Post from "../post/PostContent";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        //console.log(posts)
        <Post key={p._id} post={p} />                 //must add the key= property or it sends a warning message.
        //<Post />
      ))}
    </div>
  );
}