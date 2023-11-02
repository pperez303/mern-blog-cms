import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import "./home.css";

// Components
import Header from "../../components/common/header/Header";

import Posts from "../../components/content/posts/Posts";


function Home() {
  // Setup the useState with an empty array
  const [posts, setPosts] = useState([]);

  // Deconstruct and return the 'search' property from useLocation like "?user=pedro"
  const { search } = useLocation();
  console.log("PROXY = ", process.env.PROXY)

  // Fetch the posts.  If the { search } is empty, then fetch all the Posts, Else fetch a single Post based on the property.
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(process.env.REACT_APP_PROXY + "/api/posts/" + search);     // references /api
      console.log('useEffect')
      console.log(res);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}

export default Home;