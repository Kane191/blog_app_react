import React,{useState,useEffect} from "react";
import Axios from "axios";
import '../styles/fullPost.css'
// import { BrowserRouter as useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const FullPostb = () => {
    const [post, setPost]= useState();
    const { id } = useParams();
    console.log(id);
    

  return (
    <div>FullPostb</div>
  )
}

export default FullPostb