import { FC } from "react"

type Prop ={
    name?:string,
    bgc?:string,
    func?:Function,
    key?:number

}

export const CategoryLabel:FC<Prop> = (Prop) => {

    return(
        <span className="category_label"
            style={{backgroundColor:Prop.bgc}}
            onClick={()=>Prop.func(Prop.name) }
        >
            {Prop.name}
        </span>
    )
}