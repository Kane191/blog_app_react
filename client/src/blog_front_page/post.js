import React from "react";
import './post.css';

const Post = (props) => {
    console.log(props.props);
    return (
        <div className="col">
            <div className="card">
                <img alt={props.props.title} height="250" src={require(`../images/postImages/${props.props.postImage}`)}/>
                <p className="title">{props.props.title}</p>
                <p className="text">{props.props.post}</p>
                <a href="#" className="btn btn-primary">Read more</a>
            </div>
        </div>
    )
}

export default Post;