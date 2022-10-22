import { memo,FC,useContext,useEffect } from "react";
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった

import { Topic } from "../parts/Topic";
import { LoggedInProvider,LoggedInContext } from "../global/LoggedInProvider";

//Customhooks
import { GetTopics } from "../../hooks/Topics"


// const TopicsTest = [
//     {
//         //game
//         id: 1,
//         parent_user_id:1,
//         title: "delectus aut autem",
//         status: 'プレイ中'
//     },
//     {
//         id: 2,
//         parent_user_id:2,
//         title: "quis ut nam facilis et officia qui",
//         status: '完了'
//     },
// ]



export const Home:FC = memo(() => {
    const { username,setUserName } = useContext(LoggedInContext);
    const { useremail,setUseremail } = useContext(LoggedInContext);

    //表示topics
    let {fetchTopics,topics} = GetTopics();

    useEffect(() => {//この記述で初回のみ実行される
        fetchTopics()
    },[])

    console.log(topics)
    



    // ローカルストレージからキーを指定して取得
    let loginUserName = localStorage.getItem("userName");
    let loginUserEmail = localStorage.getItem("userEmail");


    if(loginUserName !== null){
        setUserName(loginUserName);
    }

    if(loginUserEmail !== null){
        setUserName(loginUserEmail);
    }


    const TopicsCss ={
        display:"flex",
    }

    return (
        <section className="home main_contents">
            <section className="hero">

            </section>
            <p>
                ホームです。
            </p>

            <div style={TopicsCss}>

                {
                    topics.map((topic)=>(

                        <Link to={"/topics/" + topic.id} state={topic} key={topic.id}>
                            <Topic
                                key={topic.id}
                                id={topic.id}
                                title={topic.title}
                                user_id={topic.parent_user_id}
                                status={topic.status}
                            />
                        </Link>  
                    ))
                }
                   
            </div>
        </section>
    )

})