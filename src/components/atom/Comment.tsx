

// 一つ一つのコメント
export const Comment = (info) => {
    console.log("props")
    console.log(info.props)

    let propclassName = info.props.class;
    let comment = info.props.comment;
    
    return (
        <div className={'text ' + propclassName } >
            {comment}
        </div>
        
    )
}
  
    