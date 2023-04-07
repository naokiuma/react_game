
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
            console.log('取得ゲーム')
            console.log(data)
            setGame(data[0])
        })
    },[])

    const tags = ['ローグライク','泣ける']
    return (
        <section className="topic_detail">
            <div className="main_contents">
                <h2 className="topic_title">  
                    {game['game_name']}
                </h2>

                <div className="tags">
                    {
                        tags.map((tag:string)=>(
                            <span className="tag" key={tag}>
                                {tag}
                            </span>
                        ))
                    }
                </div>
                {/* 
                <div className="main_text">
                    <p>
                        body
                    </p>
                </div> */}

            </div>
            <div className="new_form_button">
                <button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
            </div>
        </section>
    )

})