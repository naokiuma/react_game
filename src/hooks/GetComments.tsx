import axios from "axios";
import {useState,useCallback} from "react";
import { CommentsType } from "../types/commentsType"


export const GetComments = () => {

    const [comments,setComments] = useState<Array<CommentsType>>([]);

    const fetchComments = () => {
      axios
      .get("http://localhost:8888/api/comments")
      .then((res) => {
        console.log('getcomments')
        setComments(res.data);
      })
     }

    return {fetchComments,comments}
}