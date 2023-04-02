import { Route,Routes,BrowserRouter } from "react-router-dom";//switch は Routesに変わった

import {render,screen,logDOM}from '@testing-library/react'
import { Header } from '../components/Templates/Header'
import { Footer } from '../components/Templates/Footer'


test('Header レンダリング test',()=>{
    render(
        <BrowserRouter>
            <Header/>
        </BrowserRouter>

    )
    logDOM(screen.getByText('ゲーム'))
})


test('Footer rendring test',()=>{
    render(<Footer/>)
    logDOM(screen.getByText('フッターパーツ'))
})