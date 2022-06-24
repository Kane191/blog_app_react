import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import '../styles/CreatePost.css';
import carrot from '../images/carrot.png';


function CreatePost() {
    

    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");
    const [postImage, setPostImage] = useState("");
    const [postImageName, setPostImageName] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();


    const saveFile = (e) => {
        setPostImage(e.target.files[0]);
        setPostImageName(e.target.files[0].name);
        console.log(e.target.files[0]);
    }

    const submitPost = (data) => {
        // append to form data here
        let formData = new FormData();
        formData.append('title', title);
        formData.append('post', post);
        formData.append('postImage', postImage);
        formData.append('postImageName', postImageName);
        console.log(data);
        Axios.post('http://localhost:3002/api/create',formData);
        navigate('/');
        // {title : title, post : post, postImage: postImage, postImageName : postImageName}
    }
    
      
    return (
        <div className="CreatePost row">
            <div className="col fbg ">
                <div className="form_bg"></div>
                <h1>TOKKI BLOG</h1>
                <div className="d-flex">
                    <p>Create a <span>POST</span></p>
                    <img alt="" src={carrot} height="60" className="logo_image"/>
                </div>
            </div>

            <div className="col form_r">
                    <input {...register("title", { required: true, maxLength: 50 })} className="form-control" placeholder="Title" type="text" onChange={(e)=>{  setTitle(e.target.value)  }} />
                    {errors.title && <p className="error">Please check the title. Max length is 50 characters</p>}
                    <br/>

                    <textarea {...register("post", { required: true, maxLength: 1000 })} className="form-control" placeholder="Body" onChange={(e)=>{  setPost(e.target.value)  }} ></textarea>
                    {errors.post && <p className="error">Please check the post. Max length is 1000 characters</p>}
                    <br/>

                    <input {...register("postImage", { required: true })} placeholder="Select an image" className="form-control" type="file" id="formFile" onChange={saveFile} ></input>
                    {errors.postImage && <p className="error">Please add an image.</p>}

                    <button className="btn btn-primary " onClick={handleSubmit(submitPost)}>Submit Post</button>
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