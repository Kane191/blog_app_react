import React from "react";
import './styles.css';
import '../GeneralStyles.css'
import carrot from '../images/carrot.png';

const Blogs = () => {
    return (
        <div>
            <div className="d_flex">
                <h1 className="heading1 orange_f">TOKKI BLOG</h1>
                <img alt="" src={carrot} height="60"/>
            </div>
        </div>
    )
}

export default Blogs;