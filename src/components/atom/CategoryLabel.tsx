import { FC,ReactElement } from "react"

type CategoryType ={
    name:string,
    bgc?:string,
    func:Function,
}

export const CategoryLabel:FC<CategoryType> = (Prop):ReactElement => {

    return(
        <span className="category_label"
            // style={{backgroundColor:Prop.bgc}}
            onClick={()=>Prop.func(Prop.name) }
        >
            {Prop.name}
        </span>
    )
}

