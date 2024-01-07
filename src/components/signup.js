import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact:'',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {// e is the event object that is returned by the onChange event listener
        setFormData({
            ...formData,// spread operator: copies all key-value pairs from formData object into this new object
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          const data = await response.json();
          // Handle the response data accordingly
          if (data.success) {
            // Redirect or show a success message
            navigate('/login');
            console.log('Signup successful:', data.message);
          } else {
            // Handle signup failure, show error message, etc.
            console.error('Signup failed:', data.message);
          }
        } catch (error) {
          console.error('Error during signup:', error);
        }
      };
    const formContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '20px',
        width: '300px',
        margin: '0 auto',
        marginTop: '50px'
    };
    
    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    };
    
    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    const findFormErrors = () => {
        const { name, email, password, confirmPassword,contact } = formData;
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!name || name === '') newErrors.name = 'Name cannot be blank!';
        if (!email || !emailRegex.test(email)) newErrors.email = 'Enter a valid email!';
        if (!password || password.length < 6) newErrors.password = 'Password must be at least 6 characters!';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords must match!';
        if(!contact || contact.length < 10) newErrors.contact = 'Contact must be 10 characters!';

        return newErrors;
    };
    const errorStyle = {
        color: 'red',
    };
    return (
        <div style={formContainerStyle}>
            <h1>Register Now</h1>
            <p>Welcome user, please register to continue to use our app </p>
            
            <form onSubmit={handleSubmit}>
            
                
                <input style={inputStyle} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                {errors.name && <p style={errorStyle}>{errors.name}</p>}
                <input style={inputStyle} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                {errors.email && <p style={errorStyle}>{errors.email}</p>}
                <input style={inputStyle} type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" />
                {errors.contact && <p style={errorStyle}>{errors.contact}</p>}
                <input style={inputStyle} type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                {errors.password && <p style={errorStyle}>{errors.password}</p>}
                <input style={inputStyle} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
                {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword}</p>}
                <button style={buttonStyle} type="submit">Submit</button>
            </form>
        </div>
    );
    };
    
    export default SignUp;