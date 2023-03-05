import axios from "axios";
import {API_BASE_URL} from "../config/url"
import {useState} from "react";
import { CategoryType } from "../types/categoryType"


const GetCategory = () => {
  let FetchURL = `${API_BASE_URL}/categories`;
  let target_URL = FetchURL;
  const [categories,setCategories] = useState<Array<CategoryType>>([]);
  const fetchCategories = () => {
	axios
		.get<Array<CategoryType>>(target_URL)
		.then((res) => {
			console.log('getCategory')
			setCategories(res.data);
		})
  }
    return {fetchCategories,categories}
}


// const CreateComments = () => {
// 	let target_URL =  `${API_BASE_URL}/comments/create`;
// 	const postComments = (topic_id,user_id,name,text,fetchCommnets,imgData?) => {
// 		axios
// 			.get(API_SANCTUM_URL, { withCredentials: true })
// 			.then((response) => {
// 				axios
// 				.post(
// 					target_URL,
// 					{topic_id: topic_id,name:name,text: text,user_id: user_id,file:imgData},
// 					{headers:
// 						{'Content-Type': 'multipart/form-data',},//画像を送る際にはこの指定が必要
// 						withCredentials:true,
// 					},
// 				)
// 				.then((res) => {
// 					fetchCommnets();
// 				})
// 			})
// 	}
// 	return {postComments};
// }


export {GetCategory}

