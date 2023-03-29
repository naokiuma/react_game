
import { memo,FC,useContext } from "react";
import { useEffect,useState } from 'react';
import { useLocation } from "react-router-dom";
import {LoggedInContext} from "../../provider/LoggedInProvider";
//インフラ
import {getGame} from "../../infrastructure/gameDriver";




export const GameDetail:FC = memo(() => {
    let [game,setGame] = useState([]);

    //user_id
    const { userid } = useContext(LoggedInContext);

    //game_id todo id取得関数を作る
    const locationVal = useLocation();
    let tempID = locationVal.pathname
    let game_id = Number(tempID.replace('/game/', ''))//topic_id

    //トピック編集用モーダル
    const [EditmodalActive,toggleEditModalActive] = useState(false)
    const [modalActive,toggleModalActive] = useState(false)
    

    useEffect(() => {
        getGame(game_id).then((data) => {
            setGame(data)
        })
    },[])

    const tags = ['ローグライク','泣ける']
    return (
        <section className="topic_detail">
         
           
            <div className="main_contents">
                <h2 className="topic_title">         
                    タイトル
                </h2>
                {/* id：{topic_id} */}

                <div className="tags">
                    {
                        tags.map((tag:string)=>(
                            <span className="tag" key={tag}>
                                {tag}
                            </span>
                        ))
                    }
                </div>

                <div className="main_text">
                    <p>
                        body
                    </p>
                </div>
                

                {/* topicのユーザーidがログイン中urser_idと同じなら編集可能 */}
                {/* {(topic[0] && (topic[0]['parent_user_id'] != userid) ) && 
                    <button onClick={() => toggleEditModalActive(!EditmodalActive)}>記事を編集</button>
                } */}


            </div>
            <div className="new_form_button">
                <button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
            </div>
        </section>
    )

})