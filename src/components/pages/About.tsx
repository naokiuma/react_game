
import { memo,FC } from "react";
import {LoggedInContext} from "../../provider/LoggedInProvider";

export const About:FC = memo(() => {
	console.log('描写');
	console.log('アバウトです');

    return (
        <section >
            アバウトページです
        </section>
    )

})