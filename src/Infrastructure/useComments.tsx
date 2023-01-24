import axios from "axios";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"
import {useState} from "react";
import { CommentsType } from "../types/commentsType"


const GetComments = (topic_ID?:number) => {
  let FetchURL = `${API_BASE_URL}/comments`;
  let target_URL = topic_ID == undefined ? FetchURL : `${FetchURL}/${topic_ID}`;
  const [comments,setComments] = useState<Array<CommentsType>>([]);
  const fetchComments = () => {
	axios
		.get<Array<CommentsType>>(target_URL)
		.then((res) => {
			console.log('getcomments')
			setComments(res.data);
		})
  }
    return {fetchComments,comments}
}


const CreateComments = () => {
	let target_URL =  `${API_BASE_URL}/comments/create`;
	const postComments = (topic_id,user_id,name,text,fetchCommnets,imgData?) => {
		axios
			.get(API_SANCTUM_URL, { withCredentials: true })
			.then((response) => {
				axios
				.post(
					target_URL,
					{topic_id: topic_id,name:name,text: text,user_id: user_id,file:imgData},
					{headers:
						{'Content-Type': 'multipart/form-data',},//画像を送る際にはこの指定が必要
						withCredentials:true,
					},
				)
				.then((res) => {
					fetchCommnets();
				})
			})
	}
	return {postComments};
}


export {GetComments,CreateComments}

