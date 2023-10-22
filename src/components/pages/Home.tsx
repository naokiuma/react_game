import { useMemo, useContext,useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Topic } from "components/atom/Topic";
import { Layout } from 'components/commons/Layout';

import { useQuery } from 'react-query';
import { useTransition } from "react";
import {GameCard} from "components/molecules/card/GameCard"

import {CategoryLabel } from "components/atom/CategoryLabel";
import {getGames} from "infrastructure/gameDriver";
import { LoggedInContext } from "provider/LoggedInProvider";

//インフラ
import {useGetTopics} from "infrastructure/topicDriver";
// import {GetTopics,useGetTopics} from "infrastructure/topicDriver";
import {GetCategory} from "infrastructure/categoryDriver";

//css
import 'css/pages/top.css';
import { SMainInfo } from './Home_css';
import { JsxElement } from "typescript";


export const Home = () => {
    const { username } = useContext(LoggedInContext); 
    const { userid } = useContext(LoggedInContext);

    const [modalActive,toggleModalActive] = useState(false)
    let [result_topics,set_result_topics] = useState([]);
    let [default_topics,set_default_topics] = useState([]);
    let [categories,set_category] = useState([])
    let [games,set_game] = useState([])
    let [selecged_tag,set_tag] = useState('すべて')
	
	// const [filtedTopics,setTopics] = useState([]);

	const { loading, topics, error } = useGetTopics();
	// const useGetTopicsFook = useGetTopics();
	// useGetTopicsFook.getPosts();
	// console.log('取得データ')
	// console.log(useGetTopicsFook.posts)

	//初回処理
    useEffect(() => {
		// getTopics();


		// デフォルト
		// GetTopics().then((data) => {
        //     set_default_topics(data);
        //     set_result_topics(data);
        // });
		
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


	const filterTopics = useMemo(() =>{
		if(topics.length > 0){
			console.log('topicsの中身');
			console.log(topics);
			return topics.filter((_topic) => {
				if(selecged_tag === 'すべて' || selecged_tag === undefined) return true;
				return _topic.tags.some(_tag => _tag.name === selecged_tag)
			})
		}
	},[selecged_tag,topics])


    // //タグが選ばれた際(通常クエリで行う場合)
    // useEffect(() => {
    //     if(selecged_tag != 'すべて'){
    //         let temp_array = [];
    //         default_topics.filter( _topic => {
    //             _topic.tags.forEach(each_tags => {
    //                 if(Object.values(each_tags).includes(selecged_tag)){
    //                     temp_array.push(_topic)
    //                 }
    //             })
    //         })
    //         set_result_topics(temp_array);
    //     }else{
    //         set_result_topics(default_topics)
    //     }
    // },[selecged_tag])


	


	
	return (
		
		<main className="top_page">
			<section className="hero">
				<div className="inner">
					<div className="first_info">
						<h1>ツミシェア</h1>
						<p>
							ツミシェアは、ゲーム体験をどんどん広げていくサービスです。
						</p>
					</div>

					<SMainInfo>
						<div className="_each">
							<div>
								<h3>
									<i className="fa-sharp fa-regular fa-pen-to-square"></i>
									積みゲーをプレイして
								</h3>
							</div>
							<figure>
								<img src="/img/top/top_billboard1.jpg" alt="" />
							</figure>
						</div>
						<div className="_each">
							<figure>
								<img src="/img/top/top_billboard2.jpg" alt="" />
							</figure>
							<div>
								<h3>
									<i className="fa-solid fa-magnifying-glass"></i>
									情報をシェアして
								</h3>
							</div>
						</div>
						<div className="_each">
							<div>
								<h3>
									<i className="fa-sharp fa-regular fa-handshake"></i>
									また積みゲーを増やす
								</h3>
							</div>
							<figure>
								<img src="/img/top/top_billboard3.jpg" alt="" />
							</figure>
						</div>
					</SMainInfo>
				</div>
			</section>
			
			<section className="home_section main_contents">
				<h2>みんなの取り組み中ゲーム</h2>
				<div className="tags_search_wrap">
					{
						categories ? 
							(
								<div>
									{categories.map((_category)=>(
										<CategoryLabel name={_category.name} func={set_tag} bgc={_category.color} key={_category.category_id}/>
									))}
									<span className="category_label" onClick={() => set_tag('すべて')}>すべて</span>
								</div>
							):
							(
								<div>カテゴリーがありません。</div>
							)
						
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
					filterTopics ? 
					(<ul className="topics_wrap">
						{
							filterTopics.map((topic)=>(
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
					</ul>):
					( <div>データがありません。</div> )
					// loading || error ?
				}
					{/* //デフォルト */}
					
					{/* // (() => {
					// if (!result_topics) {
					// 	return( <div>loading</div> );
					// } else {
					// 	return ( 
					// 	<ul className="topics_wrap">
					// 		{
					// 			result_topics.map((topic)=>(
					// 				<li key={topic.id}>
					// 					<Link to={"/topic/" + topic.id} state={topic}>
					// 						<Topic
					// 							id={topic.id}
					// 							game_title={topic.game_name}
					// 							title={topic.title}
					// 							user_id={topic.parent_user_id}
					// 							tags={topic.tags}
					// 							status={topic.status}
					// 							image_path={topic.image_path}
					// 						/>
					// 					</Link>
					// 					{(username !== 'ゲスト' && userid === topic.parent_user_id) && <span>編集</span>}
					// 				</li>
					// 			))
					// 		}  
					// 	</ul>                                
					// 	);
					// }
					// })() */}
				
			</section>


			{/* <section className="top_games main_contents">
				<h2>ゲーム一覧</h2>
				<div className="game_card_wrap">
					{games.map((each_game)=>(
						<GameCard key={each_game.id} {...each_game} />
					))}
				</div>
			</section> */}


			<div className="new_form_button">
				<button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
			</div>
		</main>
	)

}




