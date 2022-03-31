import React from "react";
import './styles.css';
import CreatePost from '../pages/CreatePost'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const Blogs = () => {
    return (
        <div>
            <div className="registration_header">
                <a href={'/'}>Register</a> &nbsp;/ &nbsp;
                <a href={'/'}>Login</a>
            </div>
            <a href="/createpost">Create post</a>
            <h1 className="heading1">The obligatory blog app in react</h1>

            
            <Router>
                <Routes>
                    <Route path = "/createpost" element={<CreatePost />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Blogs;