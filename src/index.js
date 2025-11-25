import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        username, email, password
      });
      setMessage('Registrazione riuscita! Token: ' + res.data.token.substring(0, 20) + '...');
    } catch (err) {
      setMessage('Errore: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div style={{padding: '40px', fontFamily: 'Arial', maxWidth: '500px', margin: '0 auto'}}>
      <h1>🎭 Murder Mystery Game</h1>
      <h3>Test Registrazione</h3>
      <input 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        style={{display: 'block', margin: '10px 0', padding: '10px', width: '100%'}}
      />
      <input 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        style={{display: 'block', margin: '10px 0', padding: '10px', width: '100%'}}
      />
      <input 
        type="password"
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        style={{display: 'block', margin: '10px 0', padding: '10px', width: '100%'}}
      />
      <button onClick={handleRegister} style={{padding: '10px 20px', marginTop: '10px'}}>
        Registrati
      </button>
      {message && <p style={{marginTop: '20px', padding: '10px', background: '#f0f0f0'}}>{message}</p>}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
