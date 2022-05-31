import React from 'react';
import {TodoType} from "../types/todo";

export const Todo = (
    props: Omit<TodoType, "id">//omitにすると指定のものだけを省く。
    //props: <TodoType>
    //props:any
) => {
    const { title,userId,completed = false } = props;
    const completeMark = completed ? "[完]" : "[未]" ;
    return <p>
        {`${completeMark} ${title}(ユーザーID：${userId})`}
        </p>;


}
  
    


