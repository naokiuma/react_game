import React, {ReactElement } from "react"

type CategoryType ={
    name:string,
    bgc?:string,
    func?:(name)=>void
}

export const CategoryLabel = (Prop:CategoryType):ReactElement => {

    return(
        <span className="category_label" onClick={()=>Prop.func(Prop.name)}>
            {Prop.name}
        </span>
    )
}

