import React, { useState } from 'react';

import './Login.css';

const Login = ({user, setUser}) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const login = async(id, name, password) => {

      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({id:id, name:name, password:password})
      });
      const data = await response.json();
      if (response.status === 200) {
        if (data.message) {
          setMessage(data.message);
          setId('');
          setName('');
          setEmail('');
          setPassword('');
        }
        else {
          localStorage.setItem('userCred', JSON.stringify({name:name}))
          setUser(localStorage.getItem('userCred'));
        }
      } else setMessage(`Internal server error ${response.message}`);
    };

    const register = async() => {
      setId('');
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({name:name, password:password, email:email})
    });
    const data = await response.json();
      if (response.status === 200) {
        if (data.message) {
          setMessage(data.message);
          setId('');
          setName('');
          setEmail('');
          setPassword('');
        }
        else {
          localStorage.setItem('userCred', JSON.stringify({name:name}))
          setUser(localStorage.getItem('userCred'));
        }
      } else setMessage(`Internal server error ${response.message}`);
    }

    return (
      <div className='login'>
        <input className='id' type='text' placeholder='API key' value={id} onChange={(e) => setId(e.target.value)}/>
        <input className='name' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
        <input className='email' type='email' placeholder='Email (only for register)' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input className='password' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <div className='btn_bar'>
          <button onClick={() => login(id, name, password)}>Login</button>
          <p>or</p>
          <button onClick={() => register()}>Register</button>
        </div>
        <h3>{message}</h3>
        <div className='apikey'><h3>Click register to generate a random api key and login</h3></div>
      </div>
    )
}

export default Login