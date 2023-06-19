import  {useState,createContext} from "react";

export const TotalGameCountContext = createContext(0);
export const TotalGameCountProvider = (props) => {
    const { children } = props;//一般的に、どんなものでも囲えるようにchildrecなpropsにする

    // 全体のステートオブジェクト、デフォルトの値を作成
    const [TotalGameCount, setTotalGameCount] = useState(0);

    return (
        <TotalGameCountContext.Provider value={TotalGameCount}>
            {children}
        </TotalGameCountContext.Provider>
    )
}
