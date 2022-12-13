
// type TopicType = {
//     title: string;
//     id: number;
//     user_id?:number
//     participants?:number
//     status:string
//     image_path:string
// };


export const Topic = (props) => {
    const { id,title,user_id,status,image_path} = props;

    return (
        <div className="card_wrap">
            <h4 className="_title">
                {title}
            </h4>
            <br/>
            <span>
                {status}
            </span>
            <img src={image_path} alt="" />
        </div>
        
    )
}
  
    