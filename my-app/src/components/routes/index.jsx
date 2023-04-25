import React from 'react'
import {Route,Routes}from 'react-router-dom'
import Test from '../../pages/adminPanel'
import HomePage from '../../pages/home'




export default function AllRouts() {
  return (
    <div>
        <Routes>
        <Route path='/' element={<Test/>}>

        <Route path='/home' element={<HomePage/>}/>
        </Route>
        <Route path='/login' element={<Test/>}/>

         </Routes>
    </div>
  )
}