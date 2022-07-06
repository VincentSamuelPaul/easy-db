import React, { useState, useEffect } from 'react';
import Login from './Login';
import Header from './Header';
import Body from './Body';

const Mainpage = () => {

  const [user, setUser] = useState();


  useEffect(() => {
    if (localStorage.getItem('userCred')) {
      setUser(localStorage.getItem('userCred'));
    };
  }, []);
  

  return (
    <div className='mainpage'>
      <Header setUser={setUser}/>
      { !user ? <Login setUser={setUser}/> : <Body/> }
    </div>
  )
}

export default Mainpage