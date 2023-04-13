import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextsProvider';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext();

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({data})=>{
        setUsers(data.data);
        setLoading(false)
      })
      .catch(()=>{
        setLoading(false)
      });
  }

  useEffect(() => {
    getUsers();
  }, [])
  
  const onDelete = (u) => {
    if(!window.confirm("delete user?")){
      return
    }

    axiosClient.delete(`/users/${u.id}`)
      .then(()=>{
        setNotification('user was deleted')
        getUsers();
      })
      .catch(err=>{
        console.log(err);
      })
  }

  return (
    <div>
      <h1>Users</h1>
      <Link to="/users/create">Add new user</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>email</th>
            <th>create date</th>
            <th>actions</th>
          </tr>
        </thead>
        {
          loading && <tbody>
            <tr>
              <td colSpan={5} style={{textAlign: 'center'}}>
                Loading...
              </td>
            </tr>
          </tbody>
        }
        <tbody>
          {users.map(u=>
            (<tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.created_at}</td>
              <td>
                <Link to={`/users/${u.id}/edit`}>Edit</Link>
                <button onClick={ev=> onDelete(u)}>delete</button>
              </td>
            </tr>)
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users