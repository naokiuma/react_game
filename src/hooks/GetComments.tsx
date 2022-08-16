import axios from "axios";
import {useState} from "react";
import { CommentsType } from "../types/commentsType"


export const GetComments = () => {

    const [comments,setComments] = useState<Array<CommentsType>>([]);
    

    // const fetchComments = () => {
      axios
      .get("http://localhost:8888/api/comments")
      .then((res) => {
        setComments(res.data);
      })
      console.log('axios内のcomments')
      console.log(comments);
    // }


    return {comments}

    
}