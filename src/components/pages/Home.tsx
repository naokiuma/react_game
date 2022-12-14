import { memo,FC,useContext,useEffect, useState,ChangeEvent} from "react";
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった
import {ImgPreview} from "../Templates/ImgPreview"


import { Topic } from "../parts/Topic";
import { LoggedInProvider,LoggedInContext } from "../global/LoggedInProvider";

//新規form
import { TopicForm } from "../parts/form/TopicForm"

//インフラ
import { GetTopics} from "../../Infrastructure/useTopics"

//css
import '../../css/pages/top.css';





export const Home:FC = memo(() => {
    const { username,setUserName } = useContext(LoggedInContext);
    const [modalActive,toggleModalActive] = useState(false)


    const {fetchTopics,topics} = GetTopics();

    useEffect(() => {
        console.log('useeffect検知しました');
        fetchTopics()
    },[])


    // ローカルストレージからキーを指定して取得
    let loginUserName = localStorage.getItem("userName");
    let loginUserEmail = localStorage.getItem("userEmail");


    if(loginUserName !== null){
        setUserName(loginUserName);
    }

    if(loginUserEmail !== null){
        setUserName(loginUserEmail);
    }


    return (
        <>
            <section className="hero">
                <div className="inner">
                    <h1>Enjog</h1>

                    <p>
                        <span>
                            Enjog
                        </span>
                        で、「楽しんでいる最中」のログを残す。
                        {/* クリアしてなくても、<br/>
                        観終わってなくても、<br/>
                        読み終わってなくても、<br/>
                        その時その時のエンジョイの気持ち、感動を記録しよう。<br/> */}
                    </p>
                </div>

            </section>
            <section className="home_section main_contents">
                <ul className="topics_wrap">
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
                            </li>
                        ))
                    }  
                </ul>
                
                <TopicForm isActive={modalActive} fetchTopics={fetchTopics} toggleModalActive={toggleModalActive}/> 
                
            </section>


            <div className="new_form_button">
                <button onClick={() => toggleModalActive(!modalActive)}>新規トピックの投稿</button>
            </div>
        </>
    )

})