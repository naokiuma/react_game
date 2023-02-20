import {render,screen,logDOM}from '@testing-library/react'
import { Footer } from '../components/Templates/Footer'

test('Header rendring test',()=>{
    render(<Footer/>)
    logDOM(screen.getByText('フッターパーツ'))
})