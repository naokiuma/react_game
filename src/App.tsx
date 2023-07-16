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
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			suspense: true,  // ここでsuspenseモードを全体で有効化する
		},
	},
});


function App() {
  return (
    <>
	<QueryClientProvider client={queryClient}>
    	<BrowserRouter>
            <LoggedInProvider>
              <ModalProvider>
                 <MainRoute />
              </ModalProvider>
            </LoggedInProvider>
    	</BrowserRouter>
		<ReactQueryDevtools />
	</QueryClientProvider>
    </>
  );
}



export default App;
