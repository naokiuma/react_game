import axios from "axios";
import {useState,useCallback} from "react";
import { CommentsType } from "../types/commentsType"



export const GetComments = (topic_ID?:number) => {

  console.log(topic_ID);
  console.log("topic_IDでした");

  let FetchURL = "http://localhost:8888/api/comments";
  // let FetchURL = "http://localhost:8888/api/comments/"; //末尾にスラッシュがあるとダメ

  let target_URL = topic_ID == undefined ? FetchURL : `${FetchURL}/${topic_ID}`;
  console.log(target_URL);
  const [comments,setComments] = useState<Array<CommentsType>>([]);
  const fetchComments = () => {
    axios
    .get(target_URL)
    // .get("http://localhost:8888/api/comments")

    .then((res) => {
      console.log('getcomments')
      setComments(res.data);
    })
    }

    return {fetchComments,comments}
}