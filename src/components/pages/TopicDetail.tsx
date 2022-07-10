import { memo,FC } from "react";


export const TopicDetail:FC = memo((props) => {
    const topicinfo = props
    console.log(props)
    return <section className="topic">
        <p>
            <div>
               こんにちは
            </div>
        </p>
    </section>;

})