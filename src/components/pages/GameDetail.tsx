
import { memo,useState,useEffect } from "react";

import { useLocation,Link } from "react-router-dom";

//インフラ
import {getGames, getGame_with_topic} from "../../infrastructure/gameDriver";
import {BASE_URL} from "config/url"





export const GameDetail = memo(() => {

    //game_id todo id取得関数を作る
    const locationVal = useLocation();
    let tempID = locationVal.pathname//　「game/4」など
    const gameId = Number(tempID.replace('/game/', ''))//game_id

    //トピック編集用モーダル
    let   [game,setGame] = useState([]);
    const [game_imgs,setImgs] = useState([]);
	const [main_img,setMainImg] = useState('');



	useEffect(() => {
        getGame_with_topic(gameId).then((data) => {
            console.log('取得ゲーム')
            console.log(data[0])
            setGame(data[0])
			setImgs(data[0]['images'])
			setMainImg(data[0]['images'][0].image_file_name);
        })
    },[])


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
						<span><strong>ゲームジャンル：</strong>{game['genres']}</span><br/>
						<span><strong>ハード：</strong>{game['hard']}</span>
						<div className="_btns">
							<button className="_want sclae_btn">プレイしたい</button>
							<button className="_now sclae_btn">プレイ中</button>
						</div>
						{
							game['topics'] && game['topics'].length > 0 ?
							(
								<div className="about_topics">
									<span className="_title">{game['game_name']}の話題</span>
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
						<Link className="main_btn" to={`/topic/create/${gameId}`} >
							新しく話題を登録
						</Link>
					</div>
				</div>
			</section>
		</>
    )

})

