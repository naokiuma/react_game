import { ErrorBoundary } from "react-error-boundary"
import { Fallback } from "./Fallback"

export const ErrorBoundaryWithFallback = ({ children }) => (
	<ErrorBoundary
	  fallbackRender={Fallback}
	  onError={(error, info) => console.error(error)}
	>
	  {children}
	</ErrorBoundary>
  )