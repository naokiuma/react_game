import axios from "axios";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"
import { GameType } from "types/gameType";
import {checkApiUrl} from "utils/checkApiUrl"


/**
 * 検索キーワードで取得
 */
export const searchGame = async(keyword:string):Promise<[GameType]> => {
    try{
		let FetchURL = `${API_BASE_URL}/game/search?game=${keyword}`;
		checkApiUrl(FetchURL)
		const res = await axios.get(FetchURL)
		return res.data;
    }catch(e){
		console.log('400 Error!!!')
		console.log(e)
    }
}

/**
 * 
 * @param config type:string with_topic
 */
export const getGames2 = (config:{type:string,target_game:number}) => {
	// console.log(API_BASE_URL);//http://localhost:8888/api
	let post_data = config;
	// post_data['type'] = config['type'];

	console.log('送るデータ')
	console.log(post_data)

	const FetchURL =  `${API_BASE_URL}/game/get2`;
	checkApiUrl(FetchURL)
	const res = axios//csrf保護の初期化
		.get(API_SANCTUM_URL, { withCredentials: true })
		.then(() => {
			axios.post(FetchURL,{
				post_data
			  },
			  {headers:
				  {'Content-Type': 'multipart/form-data',},
				  withCredentials:true,
			  },
			)
		})
		return res;

	
}
// 	// try{
// 	// 	  let FetchURL = game_ID === undefined ? `${API_BASE_URL}/game` : `${API_BASE_URL}/game/${game_ID}`;
// 	// 	  checkApiUrl(FetchURL)
// 	// 	  const res = await axios.get(FetchURL)
// 	// 	  return res.data;
// 	// 	}catch(e){
// 	// 	  console.log('400 Error!!')
// 	// 	  console.log(e)
// 	// 	}
// }

/**
 * idから取得 or 全て取得
 */
export const getGames = async(game_ID?:number) => {
	try{
			// console.log(API_BASE_URL);//http://localhost:8888/api
			let FetchURL = game_ID === undefined ? `${API_BASE_URL}/game` : `${API_BASE_URL}/game/${game_ID}`;
			checkApiUrl(FetchURL)
			const res = await axios.get(FetchURL)
			return res.data;
		}catch(e){
			console.log('400 Error!!')
			console.log(e)
		}
  }

export const createGame = (name:string,genre:string,category:Array<string>,imgData?) => {
  
  const FetchURL =  `${API_BASE_URL}/game/create`;
  checkApiUrl(FetchURL)
  const res = axios//csrf保護の初期化
      .get(API_SANCTUM_URL, { withCredentials: true })
      .then(() => {
        console.log('送るデータ')
        console.log(genre)
        console.log(category)

          axios.post(FetchURL,{
				game_name:name,
				genres: genre,
				category: category,
				file:imgData
			},
            {headers:
                {'Content-Type': 'multipart/form-data',},//画像を送る際にはこの指定が必要
                withCredentials:true,
            },
          )
      })
      return res;
}

