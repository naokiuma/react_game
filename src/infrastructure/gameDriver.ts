import axios from "axios";
import {API_BASE_URL} from "../config/url"
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