import React from "react";
import Axios from "axios";
import '../styles/post.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Post = (props) => {
    console.log(props.props);

    const deletePost = (id) =>{
        console.log("hellaaaauuuurrrr");
        console.log(id);
        // add axios post here to delete the post
        Axios.post('http://localhost:3002/api/delete',{id: id});
        // how to update the page automatically?
        //  I think you'd need to remove this element from the array but let's refresh instead
    }

    return (
        <div className="col">
            <div className="card">
                <a href={`/updatepost/${props.props.id}`} ><EditIcon className="edit_button"/></a>
                <DeleteIcon className="delete_button" onClick={(() => deletePost(props.props.id))}/>
                <img alt={props.props.title} height="250" src={require(`../images/postImages/${props.props.postImage}`)}/>
                <p className="title">{props.props.title}</p>
                <p className="text">{props.props.post}</p>
                <a href={`blog/${props.props.id}`} className="btn btn-primary">Read more</a>
                {/* "/readmore" */}
            </div>
        </div>
    )
}

export default Post;