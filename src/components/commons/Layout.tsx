
import {useContext,useState,useEffect} from 'react'
import { Outlet } from "react-router-dom";
import {ModalContext} from "provider/ModalProvider";
import { NoticeModal } from "components/molecules/modal/NoticeModal"
import { Footer } from 'components/commons/Footer';
import { Header } from 'components/commons/Header';


// スクロールを制御する
/**
 * @param {number}  activePoint - 表示のポイントを数値で取得
 * @return {boolean} 表示、非表示のbool値を返却する
 */
 const useHeaderShow = (activePoint: number): boolean => {
	const [isHeaderActive, setIsHeaderActive] = useState<boolean>(false);
  
	useEffect(() => {
	  const scrollWindow = () => {
		const ap = activePoint;
		let scroll = 0;
		scroll = window.scrollY;
		if (ap <= scroll) {
		  setIsHeaderActive(true);
		} else {
		  setIsHeaderActive(false);
		}
	  };
	  window.addEventListener('scroll', scrollWindow);
	  return () => {
		window.removeEventListener('scroll', scrollWindow);
	  };
	}, [activePoint]);
	console.log('結果');
	console.log(isHeaderActive)
  
	return isHeaderActive ;
  };
  
//   export default useHeaderShow;



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