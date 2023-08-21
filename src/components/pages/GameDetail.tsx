
import { memo,useContext,useState,Suspense,useEffect } from "react";

import { useLocation,useNavigate } from "react-router-dom";
import {LoggedInContext} from "../../provider/LoggedInProvider";
import { Helmet } from 'react-helmet';
//インフラ
import {getGames} from "../../infrastructure/gameDriver";




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
			<section className="">				
				<h2 className="topic_title">  
					{game['game_name']}
				</h2>
				ここです！
				{
					game_imgs ? 
					(<ul>
						{
						game_imgs.map((_img) =>(
							<span>
								ここ{_img.image_file_name}
							</span>
							
						))
						}
					</ul>
					):(<span>検索中</span>)
				}
				なんで？？？
				ゲームジャンル：{game['genres']}<br/>
				ハード：{game['hard']}

					
				<div className="new_form_button">
					<button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
				</div>
			</section>
		</main>
    )

})

