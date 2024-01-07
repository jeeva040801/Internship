import React from 'react';
import { useNavigate } from 'react-router-dom';
import myImage from '../pic/work.jpg';


const Home = () => {
    const navigate = useNavigate();


    return (
        <>
        <div style={containerStyle}>
        
            <h1 style={color}>B2B Network</h1>
            <p style={para}>Double the vision, double the impact</p>
            <div style={buttonContainerStyle}>
                <button style={buttonStyle} onClick={() => navigate('/login')}>Login</button>
                <button style={buttonStyle} onClick={() => navigate('/signup')}>Register</button>
                
            </div>
        
            
        </div>
        <div style={divStyle}>
        <img src={myImage} alt="myImage"  style={imageStyle} />
        </div>
        
        
        
        
        
        </>
    );
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '50px',
    padding: '20px 50px 20px 50px' 
};
const imageStyle = {
        
        // position: "fixed",
        // width: "10000px", 
        // height: "100px", 
        // position: ' fixed',
        // left: '0',
        // right: '0',
        // bottom: '0',
        // height: '300px',
        // borderRadius: '800px 900px 0px 0px'
        position: "fixed",
         left: '0',
        right: '0',
        bottom: '0',
        height: '350px',
        width: "100%", // this will make the image take the full width of the div
        objectFit: 'cover', // this will make the image cover the entire content box
        borderRadius: '95% 120% 0 0'
        
        
        
    };


const buttonStyle = {
    padding: '10px 50px ',
    fontSize: '16px',
    borderRadius: '40px 40px 40px 40px', // Add this line
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    cursor: 'pointer',
    marginBottom:'300px'
};
const color = {
    color: '#192bc2'
};
const para={
    color:'black',
    textAlign:'center',
    fontSize:'20px',
    fontWeight:'bold'

};
const divStyle = {
    // width: '800px',
    // height: '491px',
    // top: '422px',
    // left: '-112px',
    // backgroundColor: '#D9D9D9',
    // borderRadius: '150px 150px',
    position: ' fixed',
    left: '0',
    right: '50px',
    bottom: '0',
    height: '300px',
    width:'100%',
    
    backgroundColor: '#D9D9D9',
    borderRadius: '50% 50% 0 0',
    padding: '20px 50px 20px 50px' ,
    zIndex: '-1'

    
    


};

export default Home;