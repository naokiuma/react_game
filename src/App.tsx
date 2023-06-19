// import { useContext} from 'react'
import { BrowserRouter } from "react-router-dom";//switch は Routesに変わった
import { MainRoute } from "../src/router/MainRoute";
import { ChakraProvider } from '@chakra-ui/react'



//プロバイダー。この中でグローバルstateを利用可能
import { LoggedInProvider} from "./provider/LoggedInProvider";
import { ModalProvider} from "./provider/ModalProvider";

// import { TotalGameCountProvider} from "./provider/TotalGameCountProvider";

import { Header } from './components/Templates/Header';
import { Footer } from './components/Templates/Footer';

/*css*/
import './App.css';
import './css/global/reset.css';
import './css/global/main.css';



function App() {
  return (
    <>
    {/* <ChakraProvider resetCSS={false}> */}
      <BrowserRouter>
          <main>
          {/* <TotalGameCountProvider>  */}
            <LoggedInProvider>
              <ModalProvider>
                <Header />
                 <MainRoute />
                <Footer />
              </ModalProvider>
            </LoggedInProvider>
          {/* </TotalGameCountProvider> */}
          </main>
      </BrowserRouter>
    {/* </ChakraProvider> */}

    </>
  );
}



export default App;
