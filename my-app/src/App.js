import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRouts from "./components/routes";
import { AuthProvider } from "react-auth-kit";

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
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
