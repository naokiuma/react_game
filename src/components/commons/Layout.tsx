
import {useContext} from 'react'
import { Outlet } from "react-router-dom";
import {ModalContext} from "provider/ModalProvider";
import { NoticeModal } from "components/molecules/modal/NoticeModal"
import { Footer } from 'components/commons/Footer';
import { Header } from 'components/commons/Header';

import  useHeaderShow from 'utils/useHeaderShow';

export const Layout = () => {
	const isHeaderShow = useHeaderShow(100);
    let modalcontext = useContext(ModalContext)
    return(
        <>
			<Header isScroll={isHeaderShow}/>
				{  modalcontext.Modalmsg !== '' ? (<NoticeModal msg={modalcontext.Modalmsg} modalActive={true}/>) : (<></>)}
				<Outlet/>
			<Footer/>            
        </>
    )

}