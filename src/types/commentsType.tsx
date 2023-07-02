export type CommentsType = {
    comment_id?:number;
    topic_id:number
    user_id:number;
    name:string;
    text:string;
    created_at?:string;
    updated_at?:string;
};


export type CommentFormType ={
    form_title:string,//formの題名
    isActive:boolean,
    topic_id:number,
    toggleModalActive:Function,
	handleValueChange?:Function
}