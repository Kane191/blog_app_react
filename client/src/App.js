import './App.css';
import Blogs from './blog_front_page/index';
import React from "react";
import CreatePost from './pages/CreatePost'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const App = () =>{
  return (

      <div>
        <div className="registration_header">
            <a href={'/'}>Register</a> &nbsp;/ &nbsp;
            <a href={'/'}>Login</a>
        </div>
        <a href="/createpost">Create post</a>

        
        <Router>
            <Routes>
                <Route path = "/" element={<Blogs />} />
                <Route path = "/createpost" element={<CreatePost />} />
            </Routes>
        </Router>
      </div>
  );
}

export default App;
