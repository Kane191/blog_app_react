import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/CreatePost.css';

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [serverError, setServerError] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        // Axios.get('http://localhost:3002/api/login').then((response)=>{
        //     if (response.data.loggedIn === true) {
        //         setRole(response.data.user[0].role);
        //     }
        // });
        Axios.get("http://localhost:3002/api/isUserAuth", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }).then((response) => {      
            console.log(response);
            if (response.data === "You are authenticated, Congrats on reaching this far :)"){
                setRole(false);
                navigate('/createpost');
            }
            else{
                setRole(true);
            }
        });
        
    }, []);

    // const userAuthenticeted = () => {
    //     Axios.get("http://localhost:3002/api/isUserAuth", {
    //       headers: {
    //         "x-access-token": localStorage.getItem("token"),
    //       },
    //     }).then((response) => {      
    //         console.log(response);
    //     });
    // };

    const submitPost = (data) => {
        console.log('getting here');
           
        Axios.post('http://localhost:3002/api/login', {email: email, password: password})
        .then((response) => {
            if (!response.data.auth) {
                console.log(`false + ${response.data}`)
                setLoginStatus(false);
            }
            else{
                console.log(response.data)
                localStorage.setItem("token", response.data.token)
                setLoginStatus(true);
                navigate('/createpost');
            }



            // if (!response.data.message) {
            //     console.log( response);
            //     setServerError();
            // } else {
            //     console.log(response.data.message);
            //     setServerError(response.data.message);
            // }
        });
    };    

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
                <p className="error"> {serverError}</p>

                {role && (
                <button className="btn btn-primary " onClick={handleSubmit(submitPost)}>Login</button>
                )} 
                <a href="/register">Don't have an account? Register</a>
                </div>
            </div>
                    
        </div>
    )
}

export default Login