
// import {TopicType} from "../../types/__topicType";
type TopicType = {
    title: string;
    id: number;
    userId?:number
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
  
    