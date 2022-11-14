
type TopicType = {
    title: string;
    id: number;
    user_id?:number
    participants?:number
    status:string
};


export const Topic = (props:TopicType) => {
    const { title,id,status } = props;

    return (
        <div>
            <span>
                {title}
            </span>
            <br/>
            <span>
                {status}
            </span>
        </div>
        
    )
}
  
    