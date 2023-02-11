import axios from "axios";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"

import {useState} from "react";
import { TopicsType } from "../types/topicsType"


const GetTopics = () => {
	let base_URL =  `${API_BASE_URL}/topics`;
	const [topics,setTopics] = useState<Array<TopicsType>>([]);

	const fetchTopics = async (topic_ID?:number) => {
		let target_URL = topic_ID == undefined ? base_URL : `${base_URL}/${topic_ID}`;
		const res = await axios.get<Array<TopicsType>>(target_URL)
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
