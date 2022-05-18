import React from "react";
import './index.css';
import '../GeneralStyles.css'
import carrot from '../images/carrot.png';
import Post from './post';

const Blogs = () => {
    return (
        <div className="parent">
            <div className="d_flex logo">
                <h1 className="heading1 orange_f">TOKKI BLOG</h1>
                <img alt="" src={carrot} height="60" className="logo_image"/>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 posts">
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
}

export default Blogs;