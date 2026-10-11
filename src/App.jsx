import { Toaster } from "react-hot-toast"
import AppRouter from "./routes/AppRouter"
import { AuthProvider } from "./context/AuthContext"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import ThemeManager from "./components/ui/ThemeManager"
import GlobalLoader from "./components/ui/GlobalLoader"
// import { ThemeProvider } from "./context/ThemeContext"

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>

          <ThemeManager />
          <GlobalLoader />
          <Toaster
            position="top-right"
            reverseOrder={false}
          />

          <AppRouter />
        </AuthProvider>
      </Provider>
    </>
  )
}

export default App