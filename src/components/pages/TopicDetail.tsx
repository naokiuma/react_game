import { memo,FC } from "react";
import { useLocation } from "react-router-dom";


export const TopicDetail:FC = memo(() => {
    const location = useLocation();
    const test = location.state;
    console.log(test)
    return <section className="topic">
        <p>
            <div>
               こんにちは
            </div>
        </p>
    </section>;

})