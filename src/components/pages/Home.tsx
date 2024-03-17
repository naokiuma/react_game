import { useMemo, useContext, useState} from "react";
import { Link } from "react-router-dom";
import { Topic } from "components/atom/Topic";
import { useQuery } from 'react-query';

import {CategoryLabel } from "components/atom/CategoryLabel";


//インフラ
import {getTopic} from "infrastructure/topicDriver";
import {GetCategory} from "infrastructure/categoryDriver";

//css
import 'css/pages/top.css';
import { SMainInfo } from './Home_css';


export const Home = () => {

	//各データ取得
	const {data :topics} = useQuery({
		queryKey:['topics'] ,
		queryFn:async () => {
			return getTopic(8);
		}
	});

	const { data :categories} = useQuery({
		queryKey:['categories'] ,
		queryFn:async() => {
			return GetCategory()
		}
	});

    const [modalActive,toggleModalActive] = useState(false)
    const [selecged_tag,set_tag] = useState('すべて')
	console.log('は');
	console.log(topics.length)
	
	const filterTopics = useMemo(() =>{
		if(topics.length > 0){

			return topics.filter((_topic) => {
				if(selecged_tag === 'すべて' || selecged_tag === undefined) return true;
				return _topic.tags.some(_tag => _tag.name === selecged_tag)
			})
		}
	},[selecged_tag,topics])
	
	
	return (
		<main className="top_page">
			<section className="hero">
				<div className="inner">
					<div className="first_info">
						<h1>ゲームを積む</h1>
					</div>

					<SMainInfo>
						<div className="_each">
							<div>
								<h3>
									<i className="fa-sharp fa-regular fa-pen-to-square"></i>
									積む。
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
									楽しむ。
								</h3>
							</div>
						</div>
						<div className="_each">
							<div>
								<h3>
									<i className="fa-sharp fa-regular fa-handshake"></i>
									また積む。
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
				<div className="tags_wrap">
					{
						categories.length > 0 ? 
							(
								<>
									{categories.map((_category)=>(
										<CategoryLabel name={_category.name} func={set_tag} bgc={_category.color} key={_category.category_id}/>
									))}
									<span className="category_label" onClick={() => set_tag('すべて')}>すべて</span>
								</>
							):
							(
								<div>カテゴリーがありません。</div>
							)	
					}
				</div>

				{
					filterTopics && filterTopics.length > 0 ? 
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
								</li>
							))
						}  
					</ul>):
					( <div>データがありません。</div> )
				}
				
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




