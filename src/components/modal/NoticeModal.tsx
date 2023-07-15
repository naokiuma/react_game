import { memo,FC } from "react";



type NoticeModal = {
	msg:string,
	modalActive:boolean
}

export const NoticeModal:FC<NoticeModal> = memo((props) => {
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