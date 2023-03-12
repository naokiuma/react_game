import axios from "axios";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"

import {useState} from "react";
import { TopicType } from "../types/topicType"


const GetTopics = () => {
	let base_URL =  `${API_BASE_URL}/topics`;
	const [topics,setTopics] = useState<Array<TopicType>>([]);

	const fetchTopics = async (topic_ID?:number) => {
		let target_URL = topic_ID == undefined ? base_URL : `${base_URL}/${topic_ID}`;
		const res = await axios.get<Array<TopicType>>(target_URL)
		return res.data;
	}

    return {fetchTopics,topics}
}



const CreateTopics = () => {
	let target_URL =  `${API_BASE_URL}/topics/create`;


	const postTopics = (title,body,status,fetchTopics?,imgData?) => {
			const res = axios//csrf保護の初期化
			.get(API_SANCTUM_URL, { withCredentials: true })
			.then((response) => {
				axios.post(target_URL,
					{title: title,body: body,status: status,file:imgData},
					{headers:
						{'Content-Type': 'multipart/form-data',},//画像を送る際にはこの指定が必要
						withCredentials:true,
					},
				)
			})
			return res
	}



	return {postTopics}
}



export {GetTopics,CreateTopics}


// import axios from "axios";	
// import { useState } from "react";	
// import { UserProfile } from "../types/userProfile";	
// import { User } from "../types/api/user";	
	



// //全ユーザーを取得するカスタムフック	
// export const useAllUsers = () => {	
// const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);	
// const [loading, setLoading] = useState(false);	
// const [error, setError] = useState(false);	
	
// const getUsers = () => {	
// setLoading(true);	
// setError(false);	
	
// axios	
// 	.get<Array<User>>("https://jsonplaceholder.typicode.com/users")	
// 	.then((res) => {	
// 		console.log(res);	
// 		const data = res.data.map((user) => ({	
// 		id: user.id,	
// 		name: `${user.name}(${user.username})`,	
// 		email: user.email,	
// 		address: `${user.address.city}${user.address.suite}${user.address.street}`	
// 		}));	
// 		setUserProfiles(data);	
// 	})	
// 	.catch(() => {	
// 		//エラー時にはエラーstateをfalseに	
// 		setError(true);	
// 	})	
// 	.finally(() => {	
// 		//どちらの場合もloadingはfalseに	
// 		setLoading(false);	
// 	});	
// };	
	
// return { getUsers, userProfiles, loading, error };	
// };	
