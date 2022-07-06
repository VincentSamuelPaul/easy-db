import React, { useState } from 'react';
import './Body.css';
import MyEditor from './MyEditor';

const Body = () => {
    return (
        <div className='body'>
            <MyEditor/>
        </div>
    )
}

export default Body