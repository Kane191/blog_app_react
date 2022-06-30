const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fileupload = require("express-fileupload");
const app = express();
const  PORT = 3002;
const bcrypt = require('bcrypt');
const saltRound = 10;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require('jsonwebtoken');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// initialize the session
app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUnitialized: false,
        cookie: {
            expires: 60 * 60 * 24
        }
    })
)
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

// inserting users to the db
app.post(`/api/register`, (req, res)=>{
    console.log(req.body);
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, saltRound, (err, hash)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(hash)
            db.query("INSERT INTO users (first_name, last_name, email, password) VALUES (?,?,?,?)", [first_name, last_name, email, hash], (err,result)=>{
                if(err){
                    console.log(err);
                }
                console.log(result);
            });
        }
    })
});

// check user authentication using jwt
const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.send("We need a token, please give it to us next time");
    } else {
        jwt.sign(token, "jwtSecret", (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({auth: false, message: "You are not logged in"})
            }
            else{
                req.userId = decoded.id;
                next();
            }
        })
    }
};

app.get('/api/isUserAuth', verifyJWT, (req, res) =>{
    res.send('You are authenticated, Congrats on reaching this far :)')
})


// getting session
app.get('/api/login', (req, res) =>{
    if(req.session.user) {
        res.send({ loggedIn: true, user: req.session.user});
        console.log('logged in');
    }
    else{
        res.send({ loggedIn: false });
        console.log('not logged in');
    }
})

// loging in the users function
app. post(`/api/login`, (req, res)=>{
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    db.query(`SELECT * FROM users WHERE email= ?`, email, (err, result)=> {
        if(err) {
            console.log(err);
        }

        if(result.length > 0){
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    const id = result[0].id;
                    const token = jwt.sign({id}, "jwtSecret", {
                        expiresIn: 300,
                    })
                    console.log(`id is ${id} and token is ${token}`);
                    // basically here we have set the result to session
                    req.session.user = result;
                    // res.send(response);
                    res.json({auth: true, token: token, result: result});
                } else{
                    console.log("Wrong email/ password comination!");
                    // res.send({message: "Wrong email/ password comination!"}); 
                    res.json({auth: false, message: "Wrong email/password"});
                }
            });
        }else{
            console.log("User doesn't exist");
            // res.send({message: "User doesn't exist"})
            res.json({auth: false, message: "User doesn't exist"})
        }
        
    });
});


// listening to db
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

// benefits of calling
// I'll know if there's sth wrong

// benefits of not calling
// I don't like this new role of always calling Mwangi.
// He should communicate without having someone else have to initiate
// It could be that what he needs is time.

// which one is more Christlike?
// This is quite tricky... Those who came to Christ He healed but they for sure commnicated their need and with faith too.
// If I knew whether there was a problem I would have asked butI have no clue other than to assume.
// love joy peace kindness goodness patience faithfulness humility and self control

// at the end of the day whether you are justified or not , an argumentdoesn't solve anything and no party feels good later on.

// maybe I need to stop jumping to conclusions and practice patience for a day.
// If tomorrow by 3 he doesn't come then I'll call.
// It's not the first time he's not come.