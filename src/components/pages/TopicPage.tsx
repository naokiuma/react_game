import { memo,FC } from "react";
import { useLocation } from "react-router-dom";
import { Comment } from "../atom/Comment";


export type CommentsType = {
    topic_id:number
    comment_id:number;
    user_id:number;
    text:string;
}

export const TopicPage:FC = memo(() => {
    const location = useLocation();
    console.log(location)
    const locationVal = location.state;
    const tags = ['ホラー','アクション']

    const commets:CommentsType[] = [
        {
            comment_id:1,
            topic_id:1,
            user_id:1,
            text:'めっちゃおもろいな',
        },
        {
            comment_id:2,
            topic_id:1,
            user_id:2,
            text:'でもかなり怖くない？',
        }
    ]

    return (
        <section className="topic">
            <div className="billboard">
                <div className="billboard_inner">
                    <h1 className="topic_title">{location.state['title']}</h1>
                </div>
            </div>

            <div className="main_contents">
                <h2 className="game_title">
                    ダイイングライト
                </h2>
                parent_user_id：{location.state['parent_user_id']}
                    <div className="tags">
                        {
                            tags.map((tag:string)=>(
                                <span className="tag" key={tag}>
                                    {tag}
                                </span>
                            ))
                        }
                    </div>
                    <div>
                        {locationVal['status']}
                    </div>

                    <div className="comments_wrap">
                        {
                            commets.map((comment) => (
                                <div className={'text ' + (comment.user_id === locationVal['parent_user_id'] ? 'left' : 'right') } key={comment.comment_id}>
                                    {comment.text}
                                </div>
                                // <Comment info={{ class: 'John', comment: 'male' }}/>
                                
                            ))
                        }

                        
                    </div>
            </div>
        </section>
    )

})