
// type TopicType = {
//     title: string;
//     id: number;
//     user_id?:number
//     participants?:number
//     status:string
//     image_path:string
// };


export const Topic = (props) => {
    let { id,title,user_id,status,image_path} = props;

    return (
        <div className="card_wrap">
            <h4 className="_title">
                {title}
            </h4>
            <br/>
            <span>
                {status}
            </span>
            {/* {image_path != null ? image_path.replace("public","strage") : null} */}
            {image_path != null && <img src={"http://localhost:8888/" + image_path.replace("public","storage")} alt="" />}
            {/* {image_path != null && <img src={"http://localhost:8888/" + id + '/' + image_path} alt="" />} */}

        </div>
        
    )
}
  
    