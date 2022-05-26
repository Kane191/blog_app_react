import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './CreatePost.css';
import carrot from '../images/carrot.png';


function CreatePost() {
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");

    const submitPost = () => {
        Axios.post('http://localhost:3002/api/create', {userId : userId, title : title, post : post});
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
                {/* <label>Title: </label> */}
                <input className="form-control" placeholder="Title" type="text" onChange={(e)=>{  setTitle(e.target.value)  }}/><br/>

                {/* <label>Post: </label> */}
                <textarea className="form-control" placeholder="Body" onChange={(e)=>{  setPost(e.target.value)  }}></textarea><br/>

                <input placeholder="Select an image" className="form-control" type="file" id="formFile"></input>

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