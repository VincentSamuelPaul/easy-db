import React from 'react';
import './Header.css';

const Header = ({setUser}) => {

  const logout = () => {
    setUser();
    localStorage.removeItem('userCred');
  };

  return (
    <div className='header'>
        <p className='header__title'>EasyDB</p>
        <p className='logout' onClick={() => logout()}>Logout</p>
    </div>
  )
}

export default Header