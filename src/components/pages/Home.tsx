import { memo,FC,useContext,useEffect, useState,Suspense,useMemo} from "react";
import { useQuery } from 'react-query';
import { Link } from "react-router-dom";//switch は Routesに変わった
import { Topic } from "../atom/Topic";
import {CategoryLabel } from "../atom/CategoryLabel";
import {getGames} from "../../infrastructure/gameDriver";
import { LoggedInContext } from "../../provider/LoggedInProvider";
import genres from '../../utils/game_genre'
import {BASE_URL} from "../../config/url"
import Slider from "react-slick";

//インフラ
import {GetTopics} from "../../infrastructure/topicDriver";
import {GetCategory} from "../../infrastructure/categoryDriver";

//css
import '../../css/pages/top.css';

import { SMainInfo } from './Home_css';



export const Home:FC = memo(() => {

	const { isLoading, error, data:topics = [] } = useQuery(
		'topics',
		() => GetTopics(),
	);

	const {data:games = [] } = useQuery(
		'games',
		() => getGames(),
	);


	
    const [modalActive,toggleModalActive] = useState<boolean>(false)
    let [categories,set_category] = useState([])


    const { username } = useContext(LoggedInContext); 
    const { userid } = useContext(LoggedInContext);

    let SliderSettings = {
        dots: false,
        autoplay:true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    
    useEffect(() => {
        GetCategory().then((data_c) => {
            set_category(data_c);
        });
    },[])


	const [selectedTag, setTag] = useState<string | undefined>(undefined);


	const filtedTopics = useMemo(() => {
		return topics.filter((topic) => {

			if (selectedTag === 'すべて') return true;//すべてを選んだ時用
			if (selectedTag === undefined) return true;

			return topic.tags.some(_tag => _tag.name === selectedTag)

		});
	},[selectedTag,topics])



	return (
		<div className="top_page">
			<section className="hero">
				<div className="inner">
					<div className="first_info">
						<h1>ゲームを積んで、残して、広げよう。</h1>
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
									探す
								</h3>
								<p>
									エモい」「繰り返し遊べる」「コスパ最高」「指痛」<br/>
									同じカテゴリーの次にやるゲームを探すのにも使えるぞ。
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
										<CategoryLabel name={_category.name} func={setTag} bgc={_category.color}/>
									))}
									{/* <span className="category_label" onClick={() => set_tag('すべて')}>すべて</span> */}
									<span className="category_label" onClick={() => setTag('すべて')}>すべて</span>
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

				<Suspense fallback={<div>Loading...</div>}>
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
				
				</Suspense>


						
				
				
			</section>

			<Suspense fallback={<div>Game Loading...</div>}>

				<section className="top_games">
					<h2>ゲーム一覧</h2>
					<div className="games">
						<Slider {...SliderSettings}>
							{games.map((_game)=>(
								<div className="_each">
									<h3>{_game.game_name}</h3>
									<span>{genres[_game.genres]}</span>
									<figure className="img_wrap">
										{_game.images.length > 0
											? <img src={BASE_URL + _game.images[0].image_file_name.replace("public","storage")} alt="" />
											: <img src="/img/global/sample_game.jpg" alt="" />
										}
									</figure>


								</div>
							))}
						</Slider>

					</div>
				</section>
			</Suspense>


			<div className="new_form_button">
				<button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
			</div>
		</div>
	)

})









