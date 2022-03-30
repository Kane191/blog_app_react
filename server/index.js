const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const app = express();
const port = 3002;
app.use(cors());
app.use(express.json());


// creating a post
app.post('/api/create', (req, res)=>{
    const user_id = req.body.user_id;
    const title = req.body.title;
    const post = req.body.post;

    db.query("INSERT INTO posts (user_id, title, post) VALUES (?,?,?)", [user_id, title, post], (err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);
    })
} )