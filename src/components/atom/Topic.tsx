import { BASE_URL } from "config/url"
import { topicType } from "types/topicType"



export const Topic = (Props: topicType) => {
	let { id, title, user_id, game_title, body, tags, status, image_path } = Props;
	let game_hard = 'Nintendo Switch';
	if (image_path == null) {
		image_path = 'img/top/sample_topic.jpg';
	} else {
		image_path = BASE_URL + image_path.replace("public", "storage");
	}
	console.log(BASE_URL)


	return (
		<div className="topic_card_wrap">
			<h4 className="_title">
				{title}
				<span className="game_name">{game_title} / {game_hard}</span>
			</h4>
			<div className="sub_info">
				<div className="status_label">
					{status}
				</div>
				{tags &&
					<div className="tags_wrap">
						{tags.map((tag) => (
							<span className="category_label" key={tag.name} style={{ background: `{${tag.color}}` }}>
								{tag.name}
							</span>
						))}
					</div>
				}
			</div>
			{image_path != null && <img className="topic_img" src={image_path} alt="" />}
		</div>

	)
}


