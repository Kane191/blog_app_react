import React,{useState,useEffect} from "react";
import Axios from "axios";
import fox from '../images/fox.png';
import './fullPost.css'
import { BrowserRouter as Router, Link, Route, Routes, useParams } from 'react-router-dom';

const FullPost = () => {

  const { id } = useParams();
  const [post, setPost]=useState([]);

  useEffect(()=>{
      Axios.get(`http://localhost:3002/api/get/${id}`).then((data)=>{
          setPost(data.data)
      });
  }, []);

  console.log(post[0].title)
  return (
    <div className="readMorePost">
        <div className="readMorePostBg">
            <img src={fox} />
            <h1>{post[0].title}</h1>          
        </div>

        <div>
          <p className="post">“Sooooooo, whyyyyyyyy doooooooo youuuuuu alwaaayyyyssssssss teaseeee Judith” Flash hundred dash asked Nick on an interview this Monday morning. Though we would have liked to respect Flash and let him finish the interview, it was a Monday morning and there was much that needed to be done. So the team and I, we asked Nick Wilde why he is always teasing officer Judith. <br /><br />Guess what! The guy said that it was the joy of  his life. Apparently, Judith has the funniest reactions and Nick can’t help himself. Well let’s hope Judith won’t put him in a cell one of these days :)</p>
          <p className="author">
            Flash's team <br />
            21-06-22
          </p>
        </div>
    </div>
  )
}

export default FullPost