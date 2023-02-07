
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
    let { id,title,user_id,tags,status,image_path} = TopicType;
    console.log(tags)

    return (
        <div className="card_wrap">
            <h4 className="_title">
                {title}
            </h4>
            
            <div className="sub_info">
                <div className="status_label">
                    {status}
                </div>
                {tags && 
                    <div className="tags_wrap">
                    {tags.map((tag) => (
                        <span className='tag_button' style={{ background: `{${tag.color}}`}}>
                            {tag.name}
                        </span>
                    ))}
                    </div>
                }
            </div>

            {image_path != null && <img src={"http://localhost:8888/" + image_path.replace("public","storage")} alt="" />}
        </div>
        
    )
}


