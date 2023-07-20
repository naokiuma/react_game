
import { memo,FC } from "react";
import {Counter} from "components/study/Callback"

export const About = () => {
	console.log('描写');
	console.log('アバウトです');

    return (
        <section >

			アバウトページです<br/>
			アバウトページです<br/>
			アバウトページです<br/>
			アバウトページです<br/>
			アバウトページです
			アバウトページです
			アバウトページです

            アバウトページです
			<Counter />

        </section>
    )

}