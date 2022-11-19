import React from 'react';
import {useState,useEffect} from "react";

//firevase
import { collection, addDoc,getDocs,query, orderBy,limit,where,doc } from "firebase/firestore";
import { db } from "../../../firebase" //これがfirestore
require("firebase/firestore");

//https://mo-gu-mo-gu.com/async-await-in-useeffect/
export const SetFireData = (() => {


    //関数を非同期で書くにはこうする！ここが味噌（createUser = async()）
    //https://mo-gu-mo-gu.com/async-await-in-useeffect/
    const createUser = async() => {
        console.log("かいし");
        try {
            const docRef = await addDoc(collection(db, "users"), {
              first: "Ada",
              last: "Lovelace",
              born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    }
 


    return(
        <>
            <button onClick={createUser}>
                ユーザーを登録
            </button>
        </>
      
    )

})
  