import GameeDriver, { GamesJsons } from "../interface/gameDriver";

// todo：この方を指定する

import axios from "axios";
import {API_BASE_URL} from "../config/url"

export default class GameDriverImpl implements GameeDriver {
  SearchGame = async(keyword:string):Promise<GamesJsons> => {
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
}
