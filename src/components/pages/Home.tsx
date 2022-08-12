import { memo,FC } from "react";
import { BrowserRouter,Route,Link,Routes } from "react-router-dom";//switch は Routesに変わった

import { Topic } from "../parts/Topic";


const TopcsData = [
        {
          id: 1,
          parent_user_id:1,
          title: "delectus aut autem",
          status: 'プレイ中'
        },
        {
          id: 2,
          parent_user_id:2,
          title: "quis ut nam facilis et officia qui",
          status: '完了'
        },
    ]



export const Home:FC = () => {
    const Topics ={
        display:"flex",
    }
    return (
        <section className="home main_contents">
            <p>
                ホームです。
            </p>
            <div style={Topics}>

                {
                    TopcsData.map((topic)=>(

                        <Link to={"/topics/" + topic.id} state={topic} key={topic.id}>
                            <Topic
                                key={topic.id}
                                title={topic.title}
                                id={topic.id}
                                parent_user_id={topic.parent_user_id}
                                status={topic.status}
                            />
                        </Link>  
                    ))
                }
                   
            </div>
        </section>
    )

}