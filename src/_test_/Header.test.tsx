import { Route,Routes,BrowserRouter } from "react-router-dom";//switch は Routesに変わった

import {render,screen,logDOM}from '@testing-library/react'
import { Header } from '../components/Templates/Header'

test('Header レンダリング test',()=>{
    render(
        <BrowserRouter>
            <Header/>
        </BrowserRouter>

    )
    logDOM(screen.getByText('トップ'))
})