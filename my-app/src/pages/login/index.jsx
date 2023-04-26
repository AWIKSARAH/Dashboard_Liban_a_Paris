import React from 'react'
import './login.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import logo from "../../Le-Liban-A-Paris-Noir-removebg-preview.png";
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="LoginWrapper">

      <div className="ContentContainer">
        <img
          src={logo}
          alt="logo of liban francais"
          width={100}
        />
        <form className='login--form'>
            <h2>Sign In</h2>
          <TextField helperText="Please enter your Username" label="Username" />

          <TextField
            id="filled-password-input"
            label="Password"
            helperText="Please enter your password "
            type="password"
            autoComplete="current-password"
          />

          <Button variant="contained" color="success">
            Login
          </Button>
          <Link href="#">
            <u>Forget password</u>
          </Link>
        </form>
      </div>
    </div>
  )
}
