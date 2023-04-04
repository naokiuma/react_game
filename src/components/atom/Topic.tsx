import {BASE_URL} from "../../config/url"

// type Topic_C_Type = {
//     id: number;
//     title: string;
//     user_id?:number;
//     tags?:string[];
//     participants?:number
//     status:string
//     image_path:string
// };


export const Topic = (TopicType) => {
    let { id,title,user_id,game_name,tags,status,image_path} = TopicType;
    let game_hard = 'Nintendo Switch';
    if(image_path == null){
        image_path = 'img/top/sample_topic.jpg';
    }else{
        image_path = BASE_URL + image_path.replace("public","storage");
    }
    console.log(BASE_URL)


    return (
        <div className="topic_card_wrap">
            <h4 className="_title">
                {title}
                <span className="game_name">{game_name} / {game_hard}</span>
            </h4>

            
            <div className="sub_info">
                <div className="status_label">
                    {status}
                </div>
                {tags && 
                    <div className="tags_wrap">
                    {tags.map((tag) => (
                        <span className="category_label" key={tag.name} style={{ background: `{${tag.color}}`}}>
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


