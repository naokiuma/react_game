
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


	useEffect(() => {
        getGames(gameId).then((data) => {
            console.log('取得ゲーム')
            console.log(data)
            setGame(data[0])
        })
    },[])


    const tags = ['ローグライク','泣ける']


    return (
		<>
			<Helmet>
				<title>Runtime Title</title>
			</Helmet>
		
			<section className="topic_detail">				
				<div className="main_contents">
					<h2 className="topic_title">  
						{game['game_name']}
					</h2>
					<div className="tags">
						{
							tags.map((tag:string)=>(
								<span className="tag" key={tag}>
									{tag}
								</span>
							))
						}
					</div>
				</div>
				<div className="new_form_button">
					<button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
				</div>
			</section>
		</>
    )

})