import { memo,FC,useContext,useEffect, useState,ChangeEvent} from "react";
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった
import { Topic } from "../atom/Topic";
import { LoggedInContext } from "../global/LoggedInProvider";

//新規form
import { TopicForm } from "../Molecules/form/TopicForm"

//インフラ
import { GetTopics} from "../../Infrastructure/useTopics"

//css
import '../../css/pages/top.css';

  



export const Home:FC = memo(() => {
    const { username } = useContext(LoggedInContext);
    const { userid } = useContext(LoggedInContext);

    const [modalActive,toggleModalActive] = useState(false)


    const {fetchTopics,topics} = GetTopics();

    useEffect(() => {
        console.log('useeffect検知しました');
        fetchTopics()
    },[])

    console.log('ここでのtopics')
    console.log(topics)
    console.log(userid)




    // ローカルストレージからキーを指定して取得
    // let loginUserName = localStorage.getItem("userName");
    // let loginUserID = localStorage.getItem("userEmail");

    // // let loginUserEmail = localStorage.getItem("userEmail");

    // if(loginUserName !== null){
    //     setUserName(loginUserName);
    // }

    // if(loginUserEmail !== null){
    //     setUserID(loginUserEmail);
    // }

    console.log('usernameとid')

    console.log(username)
    console.log(userid)



    return (
        <>
            <section className="hero" style={{ backgroundImage: "url(/img/top_billboard.jpg)" }}>
                <div className="inner">
                    <div className="_left_area">
                        <h1>Enjog</h1>
                        <p>
                            記録を残そう。<br/>
                            もっとやりたいゲームをシェアしよう！
                        </p>
                    </div>
                    <div className="_right_area">
                        <ul>
                            <li>a</li>
                            <li>i</li>
                            <li>u</li>

                        </ul>
                    </div>

                </div>

            </section>
            <section className="home_section main_contents">
                <ul className="topics_wrap">
                    contextのuser_id:{userid}
                    namae:{username}
                    {
                        topics.map((topic)=>(
                            <li>
                                <Link to={"/topics/" + topic.id} state={topic} key={topic.id}>
                                    <Topic
                                        key={topic.id}
                                        id={topic.id}
                                        title={topic.title}
                                        user_id={topic.parent_user_id}
                                        status={topic.status}
                                        image_path={topic.image_path}
                                    />
                                </Link>
                                parent_uder_id:{topic.parent_user_id}
                                

                                {(username !== 'ゲスト' && userid === topic.parent_user_id) && <span>編集</span>}
                            </li>
                        ))
                    }  
                </ul>
                
                <TopicForm
                    form_title='トピックを追加'
                    isActive={modalActive}
                    fetchTopics={fetchTopics}
                    toggleModalActive={toggleModalActive}
                /> 
                
            </section>


            <div className="new_form_button">
                <button onClick={() => toggleModalActive(!modalActive)}>投稿</button>
            </div>
        </>
    )

})