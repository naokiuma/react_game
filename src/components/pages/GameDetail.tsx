
import { memo,FC,useContext,useState } from "react";
import { useQuery } from 'react-query';

import { useLocation,useNavigate } from "react-router-dom";
import {LoggedInContext} from "../../provider/LoggedInProvider";
import { Helmet } from 'react-helmet';
//インフラ
import {getGames} from "../../infrastructure/gameDriver";




export const GameDetail:FC = memo(() => {
    // let [game,setGame] = useState([]);

    //user_id
    const { userid } = useContext(LoggedInContext);

    //game_id todo id取得関数を作る
    const locationVal = useLocation();
	const history = useNavigate();

    let tempID = locationVal.pathname//　「game/4」など
    const gameId = Number(tempID.replace('/game/', ''))//game_id

    // //トピック編集用モーダル
    // const [EditmodalActive,toggleEditModalActive] = useState(false)
    const [modalActive,toggleModalActive] = useState(false)
    
	// const {data:game = []}
	const {data:game } = useQuery(
		'game',
		() => getGames(gameId),
	);


    const tags = ['ローグライク','泣ける']
    return (
		<>
			<Helmet>
				<title>Runtime Title</title>
			</Helmet>
		
			<section className="topic_detail">
				aaaa
				
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