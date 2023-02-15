// import { useContext} from 'react'
import { Route,Routes,BrowserRouter } from "react-router-dom";//switch は Routesに変わった
import { MainRoute } from "../src/router/MainRoute";
import { ChakraProvider } from '@chakra-ui/react'



//プロバイダー。この中でグローバルstateを利用可能
import { LoggedInProvider} from "./components/global/LoggedInProvider";
// import { TotalGameCountProvider} from "./components/global/TotalGameCountProvider";

import { Header } from './components/Templates/Header';
import { Footer } from './components/Templates/Footer';

/*css*/
import './App.css';
import './css/global/reset.css';
import './css/global/main.css';


function App() {
  return (
    <>
    <ChakraProvider resetCSS={false}>
      <BrowserRouter>
          <main>
          {/* <TotalGameCountProvider>  */}
            <LoggedInProvider>
                <Header />
                <MainRoute />
                <Footer />
            </LoggedInProvider>
          {/* </TotalGameCountProvider> */}
          </main>
      </BrowserRouter>
    </ChakraProvider>

    </>
  );
}



export default App;
