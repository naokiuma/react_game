import axios from "axios";
import {API_BASE_URL} from "../config/url"
import {useState} from "react";
import { TopicsType } from "../types/topicsType"


const GetTopics = (topic_ID?:number) => {
	let base_URL =  `${API_BASE_URL}/topics`;
	let target_URL = topic_ID == undefined ? base_URL : `${base_URL}/${topic_ID}`;
	const [topics,setTopics] = useState<Array<TopicsType>>([]);

	const fetchTopics = ():any => {
		console.log('fetchTopics開始〜〜')
		axios
			.get(target_URL)
			.then((res) => {
				console.log('getTopicsしました、settopicsします。')
				setTopics(res.data);
			})
	}
    return {fetchTopics,topics,setTopics}
}



const CreateTopics = () => {
	let target_URL =  `${API_BASE_URL}/topics/create`;

	const postTopics = (title,body,status,imgData?) => {
		console.log('postTopicsの中');
		// console.log(setTopics);
		console.log(title);
		console.log(imgData);
			axios//csrf保護の初期化
			.get('http://localhost:8888/sanctum/csrf-cookie', { withCredentials: true })
			.then((response) => {
			axios
			.post(
				target_URL,
				{title: title,body: body,status: status,file:imgData},
				{headers:
					{'Content-Type': 'multipart/form-data',},//画像を送る際にはこの指定が必要
					withCredentials:true,
				},
				
				)
				.then((res) => {
					console.log('createTopics')
					console.log('さて');
					// const newPosts = [...props.posts, response.data] // 解説します★7
        			// props.setPosts(newPosts)

					// console.log(topics);
					console.log('res.dataです')
					console.log(res.data)
					// setTopics(fetchTopics());
					// fetchTopics();
					
				})
			})
	}




	return {postTopics}
}



export {GetTopics,CreateTopics}
