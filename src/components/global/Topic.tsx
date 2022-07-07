
import {TopicType} from "../../types/topicType";

export const Topic = (props:TopicType) => {
    const { title,id,status } = props;

    const topic_card ={
        width:"30%"
    }

    return (
        <div style={topic_card}>
            <span>
                タイトル：{title}
            </span>
            <br/>
            <span>
                ステータス；{status}
            </span>
        </div>
        
    )
}
  
    