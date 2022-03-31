import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function CreatePost() {
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");

    const submitPost = () => {
        Axios.post('http://localhost:3002/api/create', {userId : userId, title : title, post : post})
    }

    return (
        <div className="CreatePost">
            <div>
                <label>Userid: </label>
                <input type="text" onChange={(e)=>{  setUserId(e.target.value)  }}/><br/>

                <label>Title: </label>
                <input type="text" onChange={(e)=>{  setTitle(e.target.value)  }}/><br/>

                <label>Post: </label>
                <textarea onChange={(e)=>{  setPost(e.target.value)  }}></textarea><br/>

                <button onClick={submitPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default CreatePost