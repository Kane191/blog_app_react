import React,{useState,useEffect} from "react";
import Axios from "axios";
// import {useNavigate} from "react-router-dom";
import './index.css';
import '../GeneralStyles.css'
import carrot from '../images/carrot.png';
import Post from './post';

const Blogs = () => {

    const [postList, setPostList]=useState([]);

    // let navigate = useNavigate();

    useEffect(()=>{
        Axios.get("http://localhost:3002/api/get").then((data)=>{
            setPostList(data.data)
        });
    }, []);

    
    return (
        <div className="parent">
            <div className="d_flex logo">
                <h1 className="heading1 orange_f">TOKKI BLOG</h1>
                <img alt="" src={carrot} height="60" className="logo_image"/>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4 posts">
                {postList.map((val, key)=>{
                    return(
                        <Post props={val} />
                    )
                })}
            </div>
        </div>
    )
}

export default Blogs;