import axios from "axios";
import {API_BASE_URL,API_SANCTUM_URL} from "../config/url"
import { GameType } from "../domain/game";

export const searchGame = async(keyword:string):Promise<[GameType]> => {
    try{
      let FetchURL = `${API_BASE_URL}/game/search?game=${keyword}`;
      let target_URL = FetchURL
      const res = await axios.get(target_URL)
      console.log(res)
      return res.data;
    }catch(e){
      console.log('400 Error!!')
      console.log(e)
    }
}

export const getGame = async(game_ID?:number) => {
    try{
        let target_URL = `${API_BASE_URL}/game/${game_ID}`;
        const res = await axios.get(target_URL)
        console.log('getGame');
        console.log(res.data)

        return res.data;
      }catch(e){
        console.log('400 Error!!')
        console.log(e)
      }
}


export const createGame = (name:string,genres:string,category:Array<string>,imgData?) => {

  
  const target_URL =  `${API_BASE_URL}/game/create`;
  const res = axios//csrf保護の初期化
      .get(API_SANCTUM_URL, { withCredentials: true })
      .then(() => {
        console.log('送るデータ')
        console.log(genres)
        console.log(category)

          axios.post(target_URL,
              {game_name:name,genres: genres,category: category,file:imgData},

              {headers:
                  {'Content-Type': 'multipart/form-data',},//画像を送る際にはこの指定が必要
                  withCredentials:true,
              },
          ).then(()=>{
              window.location.reload();
          })
      })
      return res;
}

