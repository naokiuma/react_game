import React from 'react';
import {useState,useEffect} from "react";

//firevase
import { collection, getDocs,doc } from "firebase/firestore";
import { ref,onValue } from "firebase/database";

import { db } from "../../firebase" //これがfirestore
import { getTypeParameterOwner } from 'typescript';



export const GetFireData = () => {

    const [fireDatas, setData] = useState([]);

   



    useEffect (() => {

        const docRef = collection(db, "game");
        getDocs(docRef).then(snapshot => {
            let results = []

            snapshot.docs.forEach(doc => {
                results.push({ id: doc.id, ...doc.data() })
                console.log(results)
            })
        })
       
     }, []); 

     return (
     <>

        <ul>
            {/* {Object.keys(fireDatas[0]).map(key => (
                <li key={key}>
                {fireDatas[0][key]}
                </li>
            ))} */}
           
        </ul>
     </>
     )

}
  