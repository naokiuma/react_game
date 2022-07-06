
import {TopicType} from "../../types/topicType";

export const Topic = (props:TopicType) => {
    const { title,id,status } = props;
    return (
        <>
           <ul>
               <li>
                   <span>
                       タイトル：{title}
                    </span>
                    <br/>
                   <span>
                       ステータス；{status}
                    </span>
               </li>
           </ul>
        </>
    )
}
  
    