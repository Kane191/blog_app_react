import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import '../styles/CreatePost.css';

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitPost = (data) => {
        Axios('http://localhost:3002/api/login', {email: email, password: password})

    }
    return (
        <div className="CreatePost row">
            <div className="col fbg ">
                <div className="form_bg"></div>
                <h1>TOKKI BLOG</h1>
                <div className="d-flex">
                    <p><span>Login</span></p>
                </div>
            </div>

            <div className="col form_r v_center">
                <div>
                <input {...register("email", { required: true, maxLength: 50 })}  className="form-control" placeholder="Email" type="email" onChange={(e)=>{  setEmail(e.target.value)  }} />
                {errors.email && <p className="error">Email not valid</p>}
                <br/>

                <input {...register("password", { required: true, maxLength: 50 })}  className="form-control" placeholder="Password" type="password" onChange={(e)=>{  setPassword(e.target.value)  }} />
                {errors.password && <p className="error">Please check the password. Password should have ...</p>}
                <br/>

                <button className="btn btn-primary " onClick={handleSubmit(submitPost)}>Login</button>
                </div>
            </div>
                    
        </div>
    )
}

export default Login