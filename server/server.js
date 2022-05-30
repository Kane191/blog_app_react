const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json());


// getting all posts
app.get("/api/get", (req, res)=>{
    db.query("SELECT * FROM posts", (err, result)=> {
        if(err) {
            console.log(err);
        }
        res.send(result);
        // console.log(result);
    });
});

// use of muller
let storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        console.log(file)
        callBack(null, '../client/src/images/')
        // ../client/src/images/ 
        // ./public/images/
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

let upload = multer({
    storage: storage
});

// creating a post
app.post('/api/create', (req, res)=>{
    const userId = req.body.userId;
    const title = req.body.title;
    const post = req.body.post;
    const postImage = req.body.postImage;
    const postImageName = req.body.postImageName;
    const postImageNameUrl = 'http://localhost:3000/images/'+ postImageName

    app.use(multer({ 
        dest: './uploads/',
        rename: function (fieldname, filename) {
            return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
        },
        onFileUploadStart: function (file) {
            console.log(file.fieldname + ' is starting ...')
        },
        onFileUploadData: function (file, data) {
            console.log(data.length + ' of ' + file.fieldname + ' arrived')
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path)
        }
    }));

    // console.log(req.body.postImage)

    // db.query("INSERT INTO posts (user_id, title, post, postImage) VALUES (?,?,?,?)", ['1', title, post, postImageNameUrl], (err,result)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log(result);
    // });
});

// listening to db
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})