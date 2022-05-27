/* eslint-disable react/jsx-filename-extension */
import './App.scss';
import React, { useEffect, useState } from 'react';
import AuthForm from './components/AuthForm/AuthForm';

function App() {
  const [token, setToken] = useState('');

  const verifyToken = (token: string) => {
    fetch('http://localhost:4000/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (res.status !== 200) {
          setToken('');
        }
      })
      .catch((err) => console.log(err));
  };

  const tokenInLocalStorage = () => {
    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      setToken(localStorageToken);
      verifyToken(localStorageToken);
    }
  };
  useEffect(tokenInLocalStorage, []);

  const insertNewSet = (token: string) => {
    fetch('http://localhost:4000/set/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: 'test set',
        description: 'test description',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="App">
      {token ? (
        <>
          <h1>AUTHORIZHED</h1>
          <button
            type="button"
            onClick={() => insertNewSet(token)}
          >
            insert new set

          </button>
        </>
      ) : (
        <AuthForm setToken={setToken} />
      )}
    </div>
  );
}

export default App;
