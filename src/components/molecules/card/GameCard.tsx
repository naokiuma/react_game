import Slider from "react-slick";
import genres from 'utils/game_genre'
import { GameType } from "types/gameType";
import {Link} from "react-router-dom";
import {BASE_URL} from "config/url"



export const GameCard = (props:GameType) => {


	const slide_settings = {
        dots: false,
        autoplay:true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

	return(
		<div className="each_game" key={props.id}>
			<Link to={"/game/" + props.id} state={props}>

			<div className="_first">
					{props.game_name}
				<span className="genre">
					{genres[props.genres] ? genres[props.genres] : '未設定'}
				</span>
			</div>

			{props.images.length > 0 ?
			<Slider {...slide_settings}>
				{props.images.map((_img)=>(
					<div className="img_wrap" key={_img.image_file_name}>
						<img src={BASE_URL + _img.image_file_name.replace("public","storage")} />     
					</div>
					))}
			</Slider>
			:
			<div className="img_wrap">
				<img src="/img/global/sample_game.jpg"/>
			</div>

			}
			{props.topics && 
			<div className="game_each_topic">
				<span>みんなの話題</span>
				<ul className="_topics">
					{props.topics.map((_topic)=>(
						<li key={_topic.id}>
							<span>名前：{_topic.title}</span><br/>
							<span>状況：{_topic.status}</span><br/>
							
						</li>       
					))}
				</ul>
			</div>
			}
			</Link>

		</div>

	)

	

}


