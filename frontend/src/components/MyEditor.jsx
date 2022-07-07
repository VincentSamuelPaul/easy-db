import React, { useState } from 'react';
import './MyEditor.css';

const MyEditor = () => {

    const [font, setFont] = useState(6);

    const [query, setQuery] = useState('');

    const [message, setMessage] = useState('');

    const [result, setResult] = useState([]);

    const name = JSON.parse(localStorage.getItem('userCred')).name;

    const add = () => {
        if (font>=0 && font<15) {
            setFont(font+1);
        };
    };

    const sub = () => {
        if (font>1 && font<15) {
            setFont(font-1);
        };
    }

    const tableHeads = async() => {
        const response = await fetch('http://127.0.0.1:8000/api/runquery/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({name:name, query:query})
        });
        const data = await response.json();
        if (response.status === 200) {
        
        }
    }

    const runQuery = async() => {
        const response = await fetch('http://127.0.0.1:8000/api/runquery/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({name:name, query:query})
        });
        const data = await response.json();
        if (response.status === 200) {
            if (data.message) {
                setMessage(data.message);
            }
            else {
                console.log(data);
                setMessage('');
                setResult(data);
            }
        }
        if (response.status === 500) {
            setMessage('Invalid Query...');
            console.log(500);
        }
    }

    return (
        <div className='editor'>
            <div className='btns'>
                <div className='fonts'>
                    <p>Font size:</p>
                    <div className='font'>
                        <button onClick={() => sub()}>-</button>
                        <p>{font}</p>
                        <button onClick={() => add()}>+</button>
                    </div>
                    <button onClick={() => runQuery()}>Run</button>
                </div>
            </div>
            <h3>Uses sqlite3...</h3>
            <div className='text'>
                <h3 style={{fontSize:`${font*3}px`}}>USE DATABASE '{name}';</h3>
                <textarea value={query} onChange={(e) => setQuery(e.target.value)} style={{fontSize:`${font*3}px`}} autoFocus='on' placeholder='$ start querying...'></textarea>
                { message ? <h3 className='message'>Status: {message}</h3> :  <h3 className='message1'>Status: success</h3> }
                <div className='output'>
                    <p>Result:</p>
                    { result ? <div className='one'>
                        { result.map((res) => {
                            return (
                                <div key={res[0]} className='row'>
                                    { res.map((re) => {
                                        return <p key={re}>{re}</p>
                                    }) }
                                </div>
                            )
                        }) }
                    </div> : ''}
                </div>
            </div>
            
        </div>
    )
}

export default MyEditor