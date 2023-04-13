import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextsProvider';

function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState();

  const {setUser, setToken} = useStateContext()

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axiosClient.post('/signup', payload)
      .then(({data})=>{
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
      <h1>Signup</h1>
      <form onSubmit={onSubmit}>
        {
          errors && <div className="alert">
            {Object.keys(errors).map(key=>(
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        <input ref={nameRef} type="text" placeholder='Full Name'/>
        <input ref={emailRef} type="email" placeholder='Email'/>
        <input ref={passwordRef} type="password" placeholder='Password'/>
        <button type='submit'>Submit</button>
        <Link to='/login'>Login</Link>
      </form>
    </div>
  )
}

export default Signup