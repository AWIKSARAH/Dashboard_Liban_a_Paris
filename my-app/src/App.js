import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRouts from "./components/routes";
import { AuthProvider } from "react-auth-kit";
import { Toaster } from "react-hot-toast";
// import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
           <AuthProvider
       authType={"cookie"}
       authName="_auth"
       cookieDomain={window.location.hostname}
       cookieSecure={false}


      >

      <BrowserRouter>
        <AllRouts />
        <Toaster/>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
