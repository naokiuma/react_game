import { useState,useEffect } from "react";


// スクロールを制御する
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
	console.log('ヘッダー表示結果');
	console.log(isHeaderActive)
  
	return isHeaderActive ;
};

export default useHeaderShow;