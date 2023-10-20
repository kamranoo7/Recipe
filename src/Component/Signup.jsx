import { Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import "./Signup.css"
const Signup = () => {
  let [email, setEmail] = useState('')
  let [pass, setPass] = useState('')
  let [name, setName] = useState('')
  let [gender, setGender] = useState('')
  let toast = useToast()
  let navigate = useNavigate()

  let handleSubmit = () => {
    let payload = {
      email,
      pass,
      name,
      gender,
    }
    fetch('https://recipe-23.onrender.com/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.msg)
        if (res.msg === 'user already exist') {
          toast({
            title: 'User Already Exist. Please Login.',
            position: 'top',
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
        } else {
          toast({
            title: 'Signup Successful',
            position: 'top',
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
        }
        navigate('/login')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="signup-container">
      <h1 className="signup-header">Signup Page</h1>
      <img
        className="signup-image"
        src="https://img.freepik.com/free-photo/shiny-sports-car-races-through-cityscape-generated-by-ai_188544-19617.jpg?size=626&ext=jpg&ga=GA1.2.1471047703.1685425578&semt=sph"
        alt=""
      />
      <label className="signup-label" htmlFor="">
        Name
      </label>
      <Input
        required={true}
        className="signup-input"
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label className="signup-label" htmlFor="">
        Gender
      </label>
      <Input
        className="signup-input"
        type="text"
        placeholder="Enter gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <br />
      <label className="signup-label" htmlFor="">
        Email
      </label>
      <Input
        className="signup-input"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label className="signup-label" htmlFor="">
        Password
      </label>
      <Input
        className="signup-input"
        type="password"
        placeholder="Enter Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <br />
      <Button className="signup-button" onClick={handleSubmit}>
        Sign Up
      </Button>
    </div>
  )
}

export default Signup
