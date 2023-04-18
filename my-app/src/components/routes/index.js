import React from 'react'
import {BrowserRouter,Route,Routes}from 'react-router-dom'
import Test from '../../pages/test'




export default function AllRouts() {
  return (
    <div>
        <Routes>
        <Route path='/' element={<Test/>}/>

         </Routes>
    </div>
  )
}