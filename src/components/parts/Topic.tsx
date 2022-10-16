
type TopicType = {
    title: string;
    id: number;
    parent_user_id?:number
    participants?:number
    status:string
};


export const Topic = (props:TopicType) => {
    const { title,id,status } = props;

    return (
        <div>
            <span>
                タイトル：{title}
            </span>
            <br/>
            <span>
                ステータス:{status}
            </span>
        </div>
        
    )
}
  
    