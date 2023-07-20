import { useMemo, FC, useContext,useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Topic } from "components/atom/Topic";
import { useQuery } from 'react-query';
import { useTransition } from "react";
import {GameCard} from "components/molecules/card/GameCard"

import top_billboard1 from 'assets/img/top_billboard1.jpg' 

import {CategoryLabel } from "components/atom/CategoryLabel";
import {getGames} from "infrastructure/gameDriver";
import { LoggedInContext } from "provider/LoggedInProvider";
import genres from 'utils/game_genre'
import {BASE_URL} from "config/url"
import Slider from "react-slick";

//インフラ
import {GetTopics} from "infrastructure/topicDriver";
import {UseFetch} from "infrastructure/interface/useFetch";

import {GetCategory} from "infrastructure/categoryDriver";

//css
import 'css/pages/top.css';
import { SMainInfo } from './Home_css';


export const Home:FC = () => {
    const { username } = useContext(LoggedInContext); 
    const { userid } = useContext(LoggedInContext);
	console.log('ない')
	console.log( process.env.REACT_APP_BASE_URL)


    const [modalActive,toggleModalActive] = useState(false)
    let [result_topics,set_result_topics] = useState([]);
    let [default_topics,set_default_topics] = useState([]);
    let [categories,set_category] = useState([])
    let [games,set_game] = useState([])
    let [selecged_tag,set_tag] = useState('すべて')
	
	// const [filtedTopics,setTopics] = useState([]);

	//初回処理
    useEffect(() => {
		//デフォルト
		GetTopics().then((data) => {
            set_default_topics(data);
            set_result_topics(data);
        });
		
        GetCategory().then((data_c) => {
            set_category(data_c);
        });

        getGames().then((data_g) =>{
			console.log(data_g)
            if(typeof data_g !== 'undefined' && data_g.length > 0){
                set_game(data_g);            
            }
        })


    },[])

	//インターフェイスを使ったreactクエリ
	// const {data:topics,error,isLoading} = UseFetch({key:'topics',fetcher:GetTopics});
	// console.log('syutokude-ta')
	// console.log(topics)
	// console.log(error)
	// console.log(isLoading)


	//react query版
	// const { isLoading, error, data:topics} = useQuery(
	// 	'topics_key',
	// 	() => GetTopics(),
	// );
	// const [filtedTopics,setTopics] = useState(topics);


	// const filterTopics = useMemo(() =>{
	// 	if(topics){
	// 		console.log('返していくお')
	// 		return topics.filter((_topic) => {
	// 			if(selecged_tag === 'すべて' || selecged_tag === undefined) return true;
	// 			return _topic.tags.some(_tag => _tag.name === selecged_tag)
	// 		})
	// 	}
	// },[selecged_tag,topics])


	


    // //タグが選ばれた際(通常クエリで行う場合)
    useEffect(() => {
        if(selecged_tag != 'すべて'){
            let temp_array = [];
            default_topics.filter( _topic => {
                _topic.tags.forEach(each_tags => {
                    if(Object.values(each_tags).includes(selecged_tag)){
                        temp_array.push(_topic)
                    }
                })
            })
            set_result_topics(temp_array);
        }else{
            set_result_topics(default_topics)
        }
    },[selecged_tag])

	


	
	return (
		<div className="top_page">
			<section className="hero">
				<div className="inner">
					<div className="first_info">
						<h1>ゲームを積んで、プレイして。</h1>
						<p>ゲームスプレッドは、ゲームの楽しみをもっと増やすためのサービスです。</p>
					</div>

					<SMainInfo>
						<div className="_each">
							<div>
								<h3>
									<i className="fa-sharp fa-regular fa-pen-to-square"></i>
									書く
								</h3>
								<p>
									ゲームの感想、攻略メモを残そう。<br/>
									ネタバレ有無の設定もできるよ！
								</p>
							</div>
							<figure>
								{/* <img src="/img/top/top_billboard1.jpg" alt="" /> */}

								<img src={top_billboard1} alt="メイン画像" />
							</figure>
						</div>
						<div className="_each">
							<figure>
								<img src="/img/top/top_billboard2.jpg" alt="" />
							</figure>
							
							<div>
								<h3>
									<i className="fa-solid fa-magnifying-glass"></i>
									探す
								</h3>
								<p>
									「エモい」「繰り返し遊べる」「コスパ最高」「指痛」<br/>
									みんなの感想から、次にやるゲームも探そう！
								</p>
							</div>
						</div>
						<div className="_each">

							<div>

								<h3>
									<i className="fa-sharp fa-regular fa-handshake"></i>
									みんなで崩そう
								</h3>
								<p>
									みんなのゲーム数をカウント。<br/>
									終わらないゲーム生活を続けていこう。
								</p>
							</div>
							<figure>
								<img src="/img/top/top_billboard3.jpg" alt="" />
							</figure>
						</div>
					</SMainInfo>
				</div>
			</section>
			
			<section className="home_section main_contents">
				<h2>みんなのプレイログ</h2>
				<div className="tags_search_wrap">

					{
						(() => {
						if (typeof categories !== 'undefined') {
							return(
								<div>
									{categories.map((_category)=>(
										<CategoryLabel name={_category.name} func={set_tag} bgc={_category.color} key={_category.category_id}/>
									))}
									<span className="category_label" onClick={() => set_tag('すべて')}>すべて</span>
								</div>
							);
						}else{
							return(
								<div>カテゴリーがありません。</div>
							)
						}
						})()
					}
					
				</div>


				{/* リアクトクエリ版 */}
				{/* <Suspense fallback={<div>トピックスを取得中・・・</div>}> */}
				{/* {
					(() => {
					if (error) {
						return( <div>トピックスを取得中・・・</div> );
					} else {
						return ( 
						<ul className="topics_wrap">
							{
								filtedTopics.map((topic)=>(
									<li key={topic.id}>
										<Link to={"/topic/" + topic.id} state={topic}>
											<Topic
												id={topic.id}
												game_title={topic.game_name}
												title={topic.title}
												user_id={topic.parent_user_id}
												tags={topic.tags}
												status={topic.status}
												image_path={topic.image_path}
											/>
										</Link>
										{(username !== 'ゲスト' && userid === topic.parent_user_id) && <span>編集</span>}
									</li>
								))
							}  
						</ul>                                
						 );
					}
					})()
				} */}
				{/* </Suspense> */}


				{/* //通常盤 */}
				{
					(() => {
					if (!result_topics) {
						return( <div>loading</div> );
					} else {
						return ( 
						<ul className="topics_wrap">
							{
								result_topics.map((topic)=>(
									<li key={topic.id}>
										<Link to={"/topic/" + topic.id} state={topic}>
											<Topic
												id={topic.id}
												game_title={topic.game_name}
												title={topic.title}
												user_id={topic.parent_user_id}
												tags={topic.tags}
												status={topic.status}
												image_path={topic.image_path}
											/>
										</Link>
										{(username !== 'ゲスト' && userid === topic.parent_user_id) && <span>編集</span>}
									</li>
								))
							}  
						</ul>                                
						);
					}
					})()
				}
			</section>


			<section className="top_games main_contents">
				<h2>ゲーム一覧</h2>
				<div className="game_card_wrap">
					{games.map((each_game)=>(
						<GameCard key={each_game.id} {...each_game} />
					))}
				</div>
			</section>


			<div className="new_form_button">
				<button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
			</div>
		</div>
	)

}




