import  {useState,createContext} from "react";


type ModalContextType ={
    Modalmsg:string;
    setModalMsg:(value:string) => void;
    Modalshow: boolean;
    setModalshow: (value: boolean) => void;
  }
  
//モーダルのプロバイダーを作成
export const ModalContext = createContext<ModalContextType>({} as ModalContextType);


//認証情報とセットするコンテキスト
export const ModalProvider = (props) => {
    const { children } = props;//一般的に、どんなものでも囲えるようにchildrecなpropsにする

     // 全体のステートオブジェクト、デフォルトの値を作成
     const [Modalmsg, setModalMsg] = useState<string>('');
     const [Modalshow, setModalshow] = useState<boolean>(false);


    return (
        <ModalContext.Provider value={{Modalmsg,setModalMsg,Modalshow,setModalshow}}>
            {children}
        </ModalContext.Provider>
    )
}

