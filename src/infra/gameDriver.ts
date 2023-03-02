import GameeDriver_I, { GamesJsons } from "../interface/gameDriver";


import axios from "axios";
import {API_BASE_URL} from "../config/url"

export default class GameDriver implements GameeDriver_I {
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
