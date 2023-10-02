
import { memo,useContext,useState,Suspense,useEffect } from "react";

import { useLocation,Link,useNavigate } from "react-router-dom";
import {LoggedInContext} from "../../provider/LoggedInProvider";
//インフラ
import {getGames, getGame_with_topic} from "../../infrastructure/gameDriver";
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
    let   [game,setGame] = useState([]);
    const [game_imgs,setImgs] = useState([]);
	const [main_img,setMainImg] = useState('');

	// const test = () => {
	// 	console.log(game['topics']);
		
	// }


	useEffect(() => {
        getGame_with_topic(gameId).then((data) => {
            console.log('取得ゲーム')
            console.log(data[0])
            setGame(data[0])
			setImgs(data[0]['images'])
			setMainImg(data[0]['images'][0].image_file_name);
        })
    },[])


    const tags = ['ローグライク','泣ける!']


    return (
		<>
			<section className="game_detail">				
				<h2 className="">  
					{game['game_name']}
				</h2>
				<div className="_inner">
					{
						game_imgs.length > 0 ? 
						(<div className="game_imgs_wrap">
							<div className="main_img">
								<img src={BASE_URL + main_img.replace("public","storage")} alt="" />
							</div>
							<div className="sub_imgs">
							{
								game_imgs.map((_img) =>(
									<img src={BASE_URL + _img.image_file_name.replace("public","storage")} onClick={() => setMainImg(_img.image_file_name.replace("public","storage"))} />
								))
							}
							</div>
						</div>
						):(<span>画像が未登録です。</span>)
					}
					<div className="_sub_info">
						<span>ゲームジャンル：{game['genres']}</span><br/>
						<span>ハード：{game['hard']}</span>
						<div className="_btns">
							<button className="_want">プレイしたい</button>
							<button className="_now">プレイ中</button>
						</div>
						{
							game['topics'] && game['topics'].length > 0 ?
							(
								<div className="about_topics">
									<span>{game['game_name']}の話題</span>
									<ul>
										{
											game['topics'].map((topic) => (
												<li>
													<Link to={"/topic/" + topic.id} state={topic}>
													{topic.title}
													</Link>
												</li>
											))
										}
									</ul>
								</div>
							):(
								<span>ない</span>
							)
						}
						<Link to={`/topic/create/new/${gameId}`} >
							新しく話題を登録
						</Link>
					</div>
				</div>
			</section>
		</>
    )

})

