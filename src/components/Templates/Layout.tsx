
import {useContext,useState} from 'react'
import { Outlet } from "react-router-dom";
import {LoggedInContext} from "provider/LoggedInProvider";
import {ModalContext} from "provider/ModalProvider";
import {LogOutUser} from 'infrastructure/authDriver'
import { NoticeModal } from "components/molecules/modal/NoticeModal"
import { Footer } from './Footer';



export const Layout = () => {
    const { userAuth,username,setUserAuth,setUserName } = useContext(LoggedInContext);
    let modalcontext = useContext(ModalContext)

    return(
        <>

            {  modalcontext.Modalmsg !== '' ? (<NoticeModal msg={modalcontext.Modalmsg} modalActive={true}/>) : (<></>)}
			<Outlet/>
			<Footer/>            
        </>
    )

}