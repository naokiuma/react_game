import React from 'react';
import {useState,useEffect} from "react";

//firevase
import { collection, getDocs,query, orderBy,limit,where } from "firebase/firestore";
import { db } from "../../firebase" //これがfirestore



export const GetFireData = () => {

    const [GameDatas, setGame] = useState([]);



    useEffect (() => {
        //const docRef = collection(db, "game");//collection gameの中身を取得
        //const docRef = query(collection(db, "game"),orderBy('id','desc'));//gameの中身を取得。idのこうじゅん。

        const docRef = query(collection(db, "game"),where("id","=",1));//collection

        getDocs(docRef).then(snapshot => {//getdocsはquerysnapshotをかえす
            let results = []
            console.log("この時点");
            console.log(typeof(snapshot))//オブジェクト


            snapshot.docs.map(doc => {
                results.push({ id: doc.id, ...doc.data() })
                console.log(results)
            })
            setGame(results);
        })
       
     }, []); 

    return GameDatas[0] ? (
        <>
            {GameDatas.map(_game => (
                <ul key={_game.id}>
                    <li>{_game.name}</li>
                </ul>
            ))
            }
        </>
        ) : (
         <p>データがありません。</p>
    )

}
  