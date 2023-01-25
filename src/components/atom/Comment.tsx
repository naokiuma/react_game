

// 一つ一つのコメント
export const Comment = (info) => {
    let propclassName = info.props.class;
    let comment = info.props.comment;
    
    return (
        <div className={'text ' + propclassName } >
            {comment}
        </div>
        
    )
}
  
    