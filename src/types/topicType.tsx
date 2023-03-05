export type TopicType = {
    id:number;
    parent_user_id:number;
    title:string;
    body:string;
    tags?:string[];
    status:string;
    image_path:string;
    created_at?:string;
    updated_at?:string;
};