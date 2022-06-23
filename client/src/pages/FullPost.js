import React,{useState,useEffect} from "react";
import Axios from "axios";
// import fox from '../images/fox.png';
import './fullPost.css'
import { BrowserRouter as Router, Link, Route, Routes, useParams } from 'react-router-dom';

const FullPost = () => {
 
  const [post, setPost]= useState([]);
  const { id } = useParams();

  useEffect(()=>{
      Axios.get(`http://localhost:3002/api/get/${id}`).then((data)=>{
          console.log(data)
          setPost({
            title: data.data[0].title,
            img: data.data[0].postImage,
            post: data.data[0].post
          })
      });
  }, [id]);

  // console.log(post.img);
  // if (post.length > 0) {
    return (
      
        <div className="readMorePost">
          <div className="readMorePostBg">
              {/* <img alt="postImg" src={require(`../images/postImages/${post.img}`)} /> */}
              {/* process.env.PUBLIC_URL + 'images/1655480999876_bt21.jpg' */}
              {/* require(`../images/postImages/${post.img}`) */}
              {/* src={require(`../images/postImages/${props.props.postImage}`)} */}
              {/* /var/www/html/my_projects/React/blog_app_react/client/src/images/postImages/1655480999876_bt21.jpg */}
              <h1>
                {post.title}
                </h1>          
          </div>

          <div>
            <p className="post">
              {post.post}
              </p>
              <p className="author">
              Flash's team <br />
              21-06-22
            </p>
          </div>
      </div>
      
      
    )
  // }
}

export default FullPost