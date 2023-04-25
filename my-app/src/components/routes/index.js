import React from 'react'
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import Test from '../../pages/test'
import Login from '../../pages/login/index'




export default function AllRouts() {
  return (
    <div>
        <Routes>
        <Route path='/' element={<Login/>}/>

         </Routes>
    </div>
  )
}