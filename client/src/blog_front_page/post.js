import React from "react";
import postImage from '../images/odi.jpg';

const Post = () => {
    return (
        <div className="col">
            <div className="card">
                <img alt="" src={postImage} height="250"/>
                <p className="title">Odi</p>
                <p className="text">Here is a rare photo of odi my pet hedgehog smiling</p>
                <a href="#">Read more</a>
            </div>
        </div>
    )
}

export default Post;