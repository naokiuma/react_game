import axios, { AxiosResponse, AxiosError } from "axios";
import {API_BASE_URL,API_SANCTUM_URL} from "config/url"
import { useState, useCallback, useEffect} from "react";
import {checkApiUrl} from "utils/checkApiUrl"


// type topicResponce = {
// 	body: string
// 	game_id: number
// 	game_name: string
// 	genres: string
// 	hard: string
// 	id: number
// 	image_path: string
// 	parent_user_id: number
// 	status: string
// 	tags:{
// 		color:string,
// 		name:string
// 	}
// 	title: string

// }


/*tanstack用にクエリを切り出したもの*/
export const getTopic = async(count:number,target_id?:number) => {
	const FetchURL = `${API_BASE_URL}/topics`;
    const target_URL = target_id == undefined ? FetchURL : `${FetchURL}/${target_id}`;
    checkApiUrl(target_URL)
	try{	
		const result = await axios.get(`${target_URL}?count=${count}`)
		return result.data
	}catch(err){
		return []
	}
}

export const useGetTopics = (count:number,target_id?:number) => {
	const [topics,setTopics] = useState([]);
	const [loading,setLoading] = useState(false);
	const [error,setError] = useState(false);
	const FetchURL = `${API_BASE_URL}/topics`;
    const target_URL = target_id == undefined ? FetchURL : `${FetchURL}/${target_id}`;
    checkApiUrl(target_URL)


	const getTopics = () =>{
		setLoading(true)
		axios.get(target_URL)
			.then((res:AxiosResponse) => {
				setTopics(res.data)
			})
			.catch((e:AxiosError) => {
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


export const CreateTopic = (game_id,title,body,status,imgData?): Promise<any> => {
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
            ).then((response)=>{
				console.log(response.data.game_id);
                // window.location.reload();
            })
        })
    return res;
}


