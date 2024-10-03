import { useState,useEffect } from "react";


/**
 * Custom hook that determines whether the header should be active based on the scroll position.
 *
 * @param {number} activePoint - The scroll position at which the header should become active.
 * @returns {boolean} - A boolean indicating whether the header is active.
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
  
	return isHeaderActive ;
};

export default useHeaderShow;