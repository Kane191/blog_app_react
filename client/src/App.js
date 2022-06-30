import './App.css';
import Blogs from './components/Posts';
import React from "react";
import CreatePost from './components/CreatePost';
import FullPost from './components/FullPost';
import Register from './components/Register';
import Login from './components/Login';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';

const App = () =>{
  return (
      <div>
        <div className="registration_header">
          <a href={'/'}><HomeIcon/><span>Home</span></a><br/>
          <a href={'/login'} className="tomboy"><AddBoxIcon/><span>Create post</span></a>
            {/* <a href={'/'}>Register</a> &nbsp;/ &nbsp;
            <a href={'/'}>Login</a> */}
        </div>
        {/* <a href="/createpost">Create post</a> */}

        
        <Router>
            <Routes>
                <Route path = "/" element={<Blogs />} />
                <Route path = "/createpost" element={<CreatePost />} />
                <Route path = "/readmore" element={< FullPost />} />
                <Route path = "blog/:id" element={< FullPost />} />
                <Route path = "/register" element={< Register />} />
                <Route path = "/login" element={< Login />} />
            </Routes>
        </Router>
      </div>
  );
}

export default App;
