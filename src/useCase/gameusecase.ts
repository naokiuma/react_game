import axios from "axios";
import {API_BASE_URL} from "../config/url"

import { GameType } from "../domain/game";



export const SearchGame = async(keyword:string) => {
    try{
      let FetchURL = `${API_BASE_URL}/game/search?game=${keyword}`;
      let target_URL = FetchURL
      const res = await axios.get(target_URL)
      return res.data;
    }catch(e){
      console.log('400 Error!!')
      console.log(e)
    }
}
