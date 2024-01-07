import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
function Login() {
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ contact: '', password: '' });
    const navigate = useNavigate();

    const handleContactChange = (e) => {
        setContact(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  let errors = { contact: '', password: '' };

  if (!contact) {
    errors.contact = 'Contact is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  setErrors(errors);

  if (!errors.contact && !errors.password) {
    // Send a POST request to the login route
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // If the login was successful, show a success message and navigate to the main page
      toast('Login successful!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: 'success',
      });
      navigate('/main-page');
    } else {
      // If the login was not successful, show an error message on the login page
      toast(data.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: 'error',
      });
    }
  }
};    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '0vh', background: '#f0f0f0' }}>
            
            <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', background: 'white', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <label style={{ marginBottom: '10px', display: 'block', color: '#333' }}>
                    Contact:
                    <input type="text" name="contact" value={contact} onChange={handleContactChange} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <div style={{ color: 'red' }}>{errors.contact}</div>
                </label>
                <label style={{ marginBottom: '10px', display: 'block', color: '#333' }}>
                    Password:
                    <input type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={handlePasswordChange} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <div style={{ color: 'red' }}>{errors.password}</div>
                </label>
                <button type="button" onClick={handleShowPassword} style={{ marginBottom: '10px', display: 'block', color: '#007BFF', background: 'none', border: 'none', cursor: 'pointer' }}>
                    {showPassword ? 'Hide Password' : 'Show Password'}
                </button>

                <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', color: 'white', background: '#007BFF', cursor: 'pointer' }}>Submit</button>
            </form>
        </div>
    );
}

export default Login;