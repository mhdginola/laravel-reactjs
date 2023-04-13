import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextsProvider';

function UserUpdate() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]= useState();
  const [user, setUsers] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
  });

  const {setNotification} = useStateContext()

  useEffect(()=>{
    setLoading(true);
    axiosClient.get(`/users/${id}`)
      .then(({data})=>{
        setLoading(false);
        setUsers(data.data);
      })
      .catch(()=>{
        setLoading(false);
      })
  },[id])

  const onSubmit = (e) =>{
    e.preventDefault();    
    axiosClient.put(`/users/${id}`, user)
      .then(()=>{
        // notification
        setNotification('user was successfully updated')
        navigate('/users');
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
      <h1>Update User: {user.name}</h1>
        {
          errors && <div className="alert">
            {Object.keys(errors).map(key=>(
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
      <form onSubmit={onSubmit}>
        <input onChange={ e => setUsers({...user, name: e.target.value}) } value={user.name} type="text" placeholder='name'/>
        <input onChange={ e => setUsers({...user, email: e.target.value}) } value={user.email} type="email" placeholder='email'/>
        <input onChange={ e => setUsers({...user, password: e.target.value}) } type="password" placeholder='password'/>
        <button type='submit'>update</button>
      </form>
    </div>
  )
}

export default UserUpdate