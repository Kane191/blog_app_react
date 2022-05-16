const express = require('express');
const db = require('./config/db');
const cors = require('cors');

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json());


// creating a post
app.post('/api/create', (req, res)=>{
    const userId = req.body.userId;
    const title = req.body.title;
    const post = req.body.post;

    db.query("INSERT INTO posts (id, user_id, title, post) VALUES (?,?,?,?)", ['4', userId, title, post], (err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);
    })
} )

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})