import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import AllRouts from "./components/routes";
import { useState } from "react";
import { UserContext } from "./common/Context";

function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
        
          
            <AllRouts />
          
        
      </BrowserRouter>
    </div>
  );
}

export default App;
