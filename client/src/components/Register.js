import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreatePost.css';

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitPost = (data) => {
        Axios.post('http://localhost:3002/api/register',{firstName: firstName, lastName: lastName, email: email, password: password},
        ).then((response)=>{
            console.log("succesfuly registered!");
            console.log(response.data.message);
            if (response.data.message === "ok"){
                navigate('/login');
            }
        });
    }
    return (
        <div className="CreatePost row">
            <div className="col fbg ">
                <div className="form_bg"></div>
                <h1>TOKKI BLOG</h1>
                <div className="d-flex">
                    <p><span>Register</span></p>
                </div>
            </div>

            <div className="col form_r vr_center">
                <div>
                <input {...register("firstName", { required: true, maxLength: 50 })}  className="form-control" placeholder="First name" type="text" onChange={(e)=>{  setFirstName(e.target.value)  }} />
                {errors.firstName && <p className="error">Please add the first name.</p>}
                <br/>

                <input {...register("lastName", { required: true, maxLength: 50 })}  className="form-control" placeholder="Last name" type="text" onChange={(e)=>{  setLastName(e.target.value)  }} />
                {errors.lastName && <p className="error">Please add the last name.</p>}
                <br/>

                <input {...register("email", { required: true, maxLength: 50 })}  className="form-control" placeholder="Email" type="email" onChange={(e)=>{  setEmail(e.target.value)  }} />
                {errors.email && <p className="error">Email not valid</p>}
                <br/>

                <input {...register("password", { required: true, maxLength: 50 })}  className="form-control" placeholder="Password" type="password" onChange={(e)=>{  setPassword(e.target.value)  }} />
                {errors.password && <p className="error">Please check the password. Password should have ...</p>}
                <br/>

                <button className="btn btn-primary " onClick={handleSubmit(submitPost)}>Register</button>
                </div>
            </div>
              
        </div>
    )
}

export default Register