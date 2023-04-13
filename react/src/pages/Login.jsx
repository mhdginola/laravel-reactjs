import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextsProvider';


function Login() {
  const [errors, setErrors] = useState();
  
  const emailRef = useRef();
  const passwordRef = useRef();

  const {setUser, setToken} = useStateContext()

  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axiosClient.post('/login', payload)
      .then(({data})=>{
        console.log(data)
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err=>{
        const response = err.response;
        if(response && response.status === 422){
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        {
          errors && <div className="alert">
            {Object.keys(errors).map(key=>(
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        <input ref={emailRef} type="email" placeholder='Email'/>
        <input ref={passwordRef} type="password" placeholder='Password'/>
        <button type='submit'>Submit</button>
        <Link to='/signup'>Signup</Link>
      </form>
    </div>
  )
}

export default Login