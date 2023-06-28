// import { useContext} from 'react'
import { BrowserRouter } from "react-router-dom";//switch は Routesに変わった
import { MainRoute } from "../src/router/MainRoute";
//プロバイダー。この中でグローバルstateを利用可能
import { LoggedInProvider} from "./provider/LoggedInProvider";
import { ModalProvider} from "./provider/ModalProvider";

/*css*/
import './App.css';
import './css/global/reset.css';
import './css/global/main.css';




function App() {
  return (
    <>
      <BrowserRouter>
          <main>
            <LoggedInProvider>
              <ModalProvider>
                 <MainRoute />
              </ModalProvider>
            </LoggedInProvider>
          </main>
      </BrowserRouter>
    </>
  );
}



export default App;
