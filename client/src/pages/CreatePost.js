import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './CreatePost.css';
import carrot from '../images/carrot.png';


function CreatePost() {
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");
    const [postImage, setPostImage] = useState("");
    const [postImageName, setPostImageName] = useState("");

    const saveFile = (e) => {
        setPostImage(e.target.files[0]);
        setPostImageName(e.target.files[0].name);
    }

    const submitPost = () => {
        Axios.post('http://localhost:3002/api/create', {title : title, post : post, postImage: postImage, postImageName : postImageName});
    }
    
      
    return (
        <div className="CreatePost row">
            <div className="col form_bg">
                <h1>TOKKI BLOG</h1>
                <div className="d-flex">
                    <p>Create a <span>POST</span></p>
                    <img alt="" src={carrot} height="60" className="logo_image"/>
                </div>
            </div>

            <div className="col form_r">
                <input className="form-control" placeholder="Title" type="text" onChange={(e)=>{  setTitle(e.target.value)  }}/><br/>

                <textarea className="form-control" placeholder="Body" onChange={(e)=>{  setPost(e.target.value)  }}></textarea><br/>

                <input placeholder="Select an image" className="form-control" type="file" id="formFile" onChange={saveFile}></input>
                {/* onChange={(e) => handleFileUpload(e)} */}
                <button className="btn btn-primary " onClick={submitPost}>Submit Post</button>
            </div>

            {
                /* 
                <label>Userid: </label>
                <input type="text" onChange={(e)=>{  setUserId(e.target.value)  }}/><br/> 
                */
            }                
        </div>
    )
}

export default CreatePost