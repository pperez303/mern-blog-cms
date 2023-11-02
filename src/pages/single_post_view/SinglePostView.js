// import React from 'react'
import Sidebar from "../../components/common/sidebar/Sidebar.js"
import SinglePost from "../../components/content/singlePost/SinglePost.js"
import "./single_post_view.css"

function Single_Post() {
  return (
    <div className="wrapper">
        <SinglePost className="singlepost" />
        <Sidebar className="sidebar" />
    </div>
  )
}

export default Single_Post;