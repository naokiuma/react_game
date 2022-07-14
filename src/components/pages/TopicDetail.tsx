import { memo,FC } from "react";
import { useLocation } from "react-router-dom";


export const TopicDetail:FC = memo(() => {
    const location = useLocation();
    const props = location.state;
    console.log(props)
    return <section className="topic">
        <p>
            <div>
               こんにちは<br />
               {props['title']}
               <div>
               {props['status']}
               </div>

            </div>
        </p>
    </section>;

})