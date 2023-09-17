// import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar.js"
import SinglePost from "../../components/singlePost/SinglePost.js"
import "./single_post_view.css"

function Single_Post() {
  return (
    <div className="single">
        <SinglePost />
        <Sidebar/>
    </div>
  )
}

export default Single_Post;