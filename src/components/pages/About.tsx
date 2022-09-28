import { memo,FC } from "react";
import {useContext} from 'react'

import {LoggedInContext} from "../global/LoggedInProvider";


export const About:FC = memo(() => {

    const { username } = useContext(LoggedInContext);


    return <section className="home">
        <p>
            アバウトです。{username}です。
        </p>
    </section>;

})