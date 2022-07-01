import React,{useState,useEffect} from "react";
import Axios from "axios";
import '../styles/fullPost.css'
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';

const FullPost = () => {
 
  const [post, setPost]= useState([]);
  const { id } = useParams();
  const [likeCount, setLikeCount] = useState([]);

  useEffect(()=>{
      Axios.get(`http://localhost:3002/api/get/${id}`).then((data)=>{
          console.log(data)
          setPost({
            title: data.data[0].title,
            img: data.data[0].postImage,
            post: data.data[0].post,
            likes: data.data[0].like_count
          })
          setLikeCount(data.data[0].like_count)
      });
  }, [id]);

  const like = () => {
    console.log('like post');
    // if 
    // use axios get to the likes from db 
    // actually we already get it from the useEffect
    // so now what we need is to update it to +1 and disable the onclick
    // after that we need to have a axios post to update the new number to db
    // kud
    // setLikeCount({likes: 0});
    const newLikes = post.likes+1
    setLikeCount(newLikes);
    Axios.post('http://localhost:3002/api/like',{likes: newLikes, postId: id});
    // post.likes = newLikes;
    console.log(likeCount)
  }

  return (
      
        <div className="readMorePost">
          <div className="readMorePostBg">
              {/* <img alt="postImg" src={require(`../images/postImages/${post.img}`)} /> */}
              <div className="wadada"></div>
              <h1>
                {post.title}
                </h1>          
          </div>

          <div>
            <p className="post">
              {post.post}
              </p>
              <p className="author">
              Flash's team <br />
              21-06-22 <br />
              < FavoriteIcon className="heartu" onClick={like} /> {likeCount}
            </p>
          </div>
          {/* “Sooooooo, whyyyyyyyy doooooooo youuuuuu alwaaayyyyssssssss teaseeee Judith” Flash hundred dash asked Nick on an interview this Monday morning. Though we would have liked to respect Flash and let him finish the interview, it was a Monday morning and there was much that needed to be done. So the team and I, we asked Nick Wilde why he is always teasing officer Judith. <br /><br />Guess what! The guy said that it was the joy of  his life. Apparently, Judith has the funniest reactions and Nick can’t help himself. Well let’s hope Judith won’t put him in a cell one of these days :) */}
      </div>
         
  )
}

export default FullPost
