import { BrowserRouter } from "react-router-dom";//switch は Routesに変わった
import { MainRoute } from "../src/router/MainRoute";
import { LoggedInUserProvider} from "./provider/LoggedInUserProvider";

import { ModalProvider} from "./provider/ModalProvider";

/*css*/
import './App.css';
import './css/global/reset.css';
import './css/global/main.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ErrorBoundaryWithFallback } from "./components/commons/ErrorBoundaryWithFallback";


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
		<ErrorBoundaryWithFallback>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<LoggedInUserProvider>
					<ModalProvider>
						<MainRoute />
					</ModalProvider>
					</LoggedInUserProvider>
				</BrowserRouter>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ErrorBoundaryWithFallback>
    </>
  );
}



export default App;
