import { useState} from 'react'
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import Test from '../../pages/test'
import Login from '../../pages/login/index'




export default function AllRouts() {
  const [token ,setToken] = useState()
  return (
    <div>
        <Routes>
        <Route path='/' element={<Login setToken = {setToken}/>}/>

         </Routes>
    </div>
  )
}