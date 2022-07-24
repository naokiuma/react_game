import { memo,FC } from "react";
import { useLocation } from "react-router-dom";

// import '../../css/global/main.css';

export type Comments = {
    comment_id:number;
    user_id:number;
    comment:string;
}

export const TopicPage:FC = memo(() => {
    const location = useLocation();
    console.log(location.state)
    const locationVal = location.state;
    const tags = ['ホラー','アクション']
    const commets:Comments[] = [
        {
            comment_id:1,
            user_id:1,
            comment:'めっちゃおもろいな',
        },
        {
            comment_id:2,
            user_id:2,
            comment:'でもかなり怖くない？',
        }
    ]
        

    

    return (

    <section className="topic">
        <div className="billboard">
            <div className="billboard_inner">
                <h1 className="topic_title">{locationVal['title']}</h1>
            </div>
        </div>

        <div className="main_contents">

            <h2 className="game_title">
                ダイイングライト
            </h2>
                <div className="tags">
                    {
                        tags.map((tag:string)=>(
                            <span className="tag">
                                {tag}
                            </span>
                        ))
                    }
                </div>
            <div>
               {locationVal['status']}
            </div>

            <div className="comments_wrap">
                todo:ここにコメント一覧を表示<div className=""></div>
            </div>
        </div>
    </section>
    )

})