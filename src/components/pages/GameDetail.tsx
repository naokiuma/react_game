
import { memo,useContext,useState,Suspense,useEffect } from "react";

import { useLocation,useNavigate } from "react-router-dom";
import {LoggedInContext} from "../../provider/LoggedInProvider";
import { Helmet } from 'react-helmet';
//インフラ
import {getGames} from "../../infrastructure/gameDriver";
import {BASE_URL} from "config/url"





export const GameDetail = memo(() => {
    // let [game,setGame] = useState([]);

    //user_id
    const { userid } = useContext(LoggedInContext);

    //game_id todo id取得関数を作る
    const locationVal = useLocation();
    let tempID = locationVal.pathname//　「game/4」など
    const gameId = Number(tempID.replace('/game/', ''))//game_id

    //トピック編集用モーダル
    const [modalActive,toggleModalActive] = useState(false)
    let [game,setGame] = useState([]);
    const [game_imgs,setImgs] = useState([]);



	useEffect(() => {
        getGames(gameId).then((data) => {
            console.log('取得ゲーム')
            console.log(data[0])
            console.log(data['images'])
			

			
            setGame(data[0])
			setImgs(data['images'])
			console.log('個onplayではきちんとセットされているか')
			console.log(game_imgs);
        })
    },[])


    const tags = ['ローグライク','泣ける!']


    return (
		<main>
			<section className="game_detail">				
				<h2 className="">  
					{game['game_name']}
				</h2>
				<div className="_inner">
					{
						game_imgs.length > 0 ? 
						(<div className="game_imgs_wrap">
							{
							game_imgs.map((_img) =>(
								<img src={BASE_URL + _img.image_file_name.replace("public","storage")} />   
							))
							}
						</div>
						):(<span>画像が未登録です。</span>)
					}
					<div className="_sub_info">
						ゲームジャンル：{game['genres']}<br/>
						ハード：{game['hard']}
					</div>

				</div>

					
				<div className="new_form_button">
					<button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
				</div>
			</section>
		</main>
    )

})

