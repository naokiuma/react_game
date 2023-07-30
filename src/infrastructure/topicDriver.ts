import axios, { AxiosResponse } from "axios";
import {API_BASE_URL,API_SANCTUM_URL} from "config/url"
import { useState, useCallback, useEffect} from "react";
import {checkApiUrl} from "utils/checkApiUrl"


type topicResponce = {
	body: string
	game_id: number
	game_name: string
	genres: string
	hard: string
	id: number
	image_path: string
	parent_user_id: number
	status: string
	tags:{
		color:string,
		name:string
	}
	title: string

}

export const useGetTopics = (topic_ID?) => {
	const [topics,setTopics] = useState([]);
	const [loading,setLoading] = useState(false);
	const [error,setError] = useState(false);

	const FetchURL = `${API_BASE_URL}/topics`;
    const target_URL = topic_ID == undefined ? FetchURL : `${FetchURL}/${topic_ID}`;
    checkApiUrl(target_URL)

	const getTopics = () =>{
		setLoading(true)

		axios.get(target_URL)
		.then((res) => {
			setTopics(res.data)
		})
		.catch(() => {
			setError(true)
		})
		.finally(() => {
			setLoading(false)

		})
	}

	//初回処理
	useEffect(() => {
		getTopics();
	},[])


	return {getTopics,loading,topics,error};
}


// export const GetTopics = async(topic_ID?:number,limit?:number):Promise<topicResponce> => {
export const GetTopics = async(topic_ID?:number,limit?:number) => {


    try{
        let FetchURL = `${API_BASE_URL}/topics`;
        let target_URL = topic_ID == undefined ? FetchURL : `${FetchURL}/${topic_ID}`;
        checkApiUrl(target_URL)


		const res: AxiosResponse= await axios.get(target_URL)
		console.log('gettopicsの取得データ')
		console.log(res);
		return res.data;
    }catch(e){
		console.log('network')
        console.log(e.response)

    }
}


export const CreateTopic = (game_id,title,body,status,imgData?) => {
    const target_URL =  `${API_BASE_URL}/topics/create`;
    checkApiUrl(target_URL);
    const res = axios//csrf保護の初期化
        .get(API_SANCTUM_URL, { withCredentials: true })
        .then(() => {
            axios.post(target_URL,
                {game_id: game_id,title: title,body: body,status: status,file:imgData},
                {headers:
                    {'Content-Type': 'multipart/form-data',},//画像を送る際にはこの指定が必要
                    withCredentials:true,
                },
            ).then(()=>{
                // window.location.reload();
            })
        })
        return res;
}


