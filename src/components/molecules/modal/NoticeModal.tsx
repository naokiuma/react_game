import { memo } from "react";
type NoticeModal = {
	msg:string,
	modalActive:boolean
}

export const NoticeModal = memo((props:NoticeModal) => {
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