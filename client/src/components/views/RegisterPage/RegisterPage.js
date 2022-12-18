import React, { useState } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/auth.js"

function RegisterPage(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log('Email:', Email)
    // console.log('Password:', Password)
    
    if (Password !== ConfirmPassword){
      return alert('It must be identical between Password and Confirm Password')
    }

    let body = {
        email: Email,
        name: Name,
        password: Password
    }
    
    dispatch(registerUser(body))
      .then(response => {
        console.log(response.payload)
        if (response.payload.success) {
          navigate('/login')
        } else {
          alert('Error')
        }
      })
  }

  return (
    <div style={{
      display: 'flex', justifyCondtent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br />
        <button type="submit">
          Register Page
        </button>
      </form>
    </div> 
  )
}

export default Auth(RegisterPage, false);