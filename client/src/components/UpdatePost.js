import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import '../styles/CreatePost.css';
import carrot from '../images/carrot.png';

const UpdatePost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");
    const [postImage, setPostImage] = useState("");
    const [postImageName, setPostImageName] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    console.log(id);

    useEffect(()=>{
        Axios.get(`http://localhost:3002/api/get/${id}`).then((data)=>{
            console.log(data)
            setPost({
              title: data.data[0].title,
              img: data.data[0].postImage,
              post: data.data[0].post,
              likes: data.data[0].like_count
            })
        });
    }, [id]);

    const submitPost = (data) => {
        // append to form data here
        let formData = new FormData();
        formData.append('id', id);
        formData.append('title', title);
        formData.append('post', post);
        console.log(data);
        Axios.post('http://localhost:3002/api/updatepost',formData);
        navigate(`/blog/${id}`);
        // {title : title, post : post, postImage: postImage, postImageName : postImageName}
    }

  return (
    <div className="CreatePost row">
        <div className="col fbg ">
            <div className="form_bg"></div>
            <h1>TOKKI BLOG</h1>
            <div className="d-flex">
                <p>Update a <span>POST</span></p>
                <img alt="" src={carrot} height="60" className="logo_image"/>
            </div>
        </div>

        <div className="col form_r">
                <input {...register("title", { required: true, maxLength: 50 })} className="form-control" placeholder="Title" type="text" value={post.title} id="test" onChange={(e)=>{  setTitle(e.target.value)  }} />
                {errors.title && <p className="error">Please check the title. Max length is 50 characters</p>}
                <br/>

                <textarea {...register("post", { required: true, maxLength: 1000 })} className="form-control" placeholder="Body"  value={post.post} onChange={(e)=>{  setPost(e.target.value)  }} ></textarea>
                {errors.post && <p className="error">Please check the post. Max length is 1000 characters</p>}
                <br/>

                <button className="btn btn-primary " onClick={handleSubmit(submitPost)}>Submit Post</button>
        </div>           
    </div>
  )
}

export default UpdatePost