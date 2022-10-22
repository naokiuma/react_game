import axios from "axios";
import {useState,useCallback} from "react";
import { CommentsType } from "../types/commentsType"

export const GetComments = (topic_ID?:number) => {
  let FetchURL = "http://localhost:8888/api/comments";
  // let FetchURL = "http://localhost:8888/api/comments/"; //末尾にスラッシュがあるとダメ

  let target_URL = topic_ID == undefined ? FetchURL : `${FetchURL}/${topic_ID}`;
  // console.log('post先')
  // console.log(target_URL);
  const [comments,setComments] = useState<Array<CommentsType>>([]);
  const fetchComments = () => {
    axios
    .get(target_URL)
    .then((res) => {
      console.log('getcomments')
      setComments(res.data);
    })
    }

    return {fetchComments,comments}
}

