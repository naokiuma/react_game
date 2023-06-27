import axios from "axios";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"
import { GameType } from "../types/gameType";
import {checkApiUrl} from "../utils/checkApiUrl"


export const searchGame = async(keyword:string):Promise<[GameType]> => {
    try{
      let FetchURL = `${API_BASE_URL}/game/search?game=${keyword}`;
      checkApiUrl(FetchURL)
      const res = await axios.get(FetchURL)
      return res.data;
    }catch(e){
      console.log('400 Error!!')
      console.log(e)
    }
}

export const getGame = async(game_ID?:number) => {
  try{
        let FetchURL = game_ID !== undefined ? `${API_BASE_URL}/game/${game_ID}` : `${API_BASE_URL}/game`;
        checkApiUrl(FetchURL)
        const res = await axios.get(FetchURL)
        console.log('getGame');
        console.log(res.data)
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

