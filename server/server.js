const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// getting all posts
app.get("/api/get", (req, res)=>{
    db.query("SELECT * FROM posts ", (err, result)=> {
        if(err) {
            console.log(err);
        }
        res.send(result);
        // console.log(result);
    });
});

// creating a post
app.post('/api/create', (req, res)=>{
    const userId = req.body.userId;
    const title = req.body.title;
    const post = req.body.post;
    const postImage = req.files.postImage;
    const postImageName = `${Date.now()}_${postImage.name}`  ;
    // const postImageNameUrl = 'http://localhost:3000/images/'+ postImageName
    const newpath = "/var/www/html/my_projects/React/blog_app_react/client/src/images/postImages/"
    
    postImage.mv(`${newpath}${postImageName}`, (err) => {
        if (err) {
          res.status(500).send({ message: "File upload failed", code: 200 });
        }
        res.status(200).send({ message: "File Uploaded", code: 200 });
      });


    db.query("INSERT INTO posts (user_id, title, post, postImage) VALUES (?,?,?,?)", ['1', title, post, postImageName], (err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);
    });
});

// getting one post
app.get(`/api/get/:id`, (req, res)=>{
    const id = req.params.id;
    db.query(`SELECT * FROM posts WHERE id= ?`, id, (err, result)=> {
        if(err) {
            console.log(err);
        }
        res.send(result);
        console.log(result);
    });
});

// listening to db
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})