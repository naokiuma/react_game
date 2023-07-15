import { memo,FC } from "react";


export const Nomatch:FC = memo(() => {
    return (

		<section className="notfound">
        	<p>このページはありません。</p>
    	</section>
	)

})