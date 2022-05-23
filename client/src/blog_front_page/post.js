import React from "react";
import './post.css';
import postImage from '../images/odi.jpg';

const Post = (props) => {
    console.log(props.props);
    // Object.keys(props)
    return (
        <div className="col">
            <div className="card">
                <img alt="" src={postImage}/>
                <p className="title">{props.props.title}</p>
                <p className="text">{props.props.post}</p>
                <a href="#" className="btn btn-primary">Read more</a>
            </div>
        </div>
    )
}

export default Post;