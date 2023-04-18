import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AllRouts from './components/routes';


function App() {
  return (
    <div className="App">
     <BrowserRouter >
     <AllRouts />
     </BrowserRouter>
    </div>
  );
}

export default App;
