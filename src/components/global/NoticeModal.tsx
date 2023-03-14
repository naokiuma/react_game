import { memo,FC } from "react";
import {ChangeEvent,useState} from 'react'



export const NoticeModal:FC<{msg:string,modalActive:boolean}> = memo((props) => {
    let msg = props.msg;
    let isActive = props.modalActive

    return (
        <div className={'notice_modal ' + (isActive == true ? 'active' : '')}>
            <span>
                {msg}
            </span>
        </div>
    )
})