import { Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
const Login = () => {
  let [email, setEmail] = useState('')
  let [pass, setPass] = useState('')
  let navigate = useNavigate()
  let toast = useToast()

  let handleLogin = () => {
    let payload = {
      email,
      pass,
    }
    fetch('https://recipe-23.onrender.com/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', res.token)
        localStorage.setItem('email', email)
        toast({
          title: 'Login Successful.',
          position: 'top',
          status: 'success',
          duration: 4000,
          isClosable: true,
        })
        navigate('/search')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="login-container">
      <h1 className="login-header">Login Page</h1>
      <img
        className="login-image"
        src="https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg?size=626&ext=jpg&ga=GA1.2.1471047703.1685425578&semt=sph"
        alt=""
      />
      <label className="login-label" htmlFor="">
        Email:-
      </label>
      <br />
      <Input
        className="login-input"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <label className="login-label" htmlFor="">
        Password:-
      </label>
      <br />
      <Input
        className="login-input"
        type="password"
        placeholder="Enter Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <br />
      <br />
      <Button className="login-button" onClick={handleLogin}>
        Login
      </Button>
    </div>
  )
}

export default Login
