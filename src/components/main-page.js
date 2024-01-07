import React  from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './main-page.css';
import image from '../pic/image.jpeg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect } from 'react';



const MainPage = (props) => {
  const [likes, setLikes] = useState(Array(props.posts.length).fill(0));
  

  useEffect(() => {
    setLikes(Array(props.posts.length).fill(0)); 
  }, [props.posts]);

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] += 1; // Increment likes by 1 for the specific post when button is clicked
    setLikes(newLikes);
  };
  
    return (
        <>
          <Navbar expand="lg" className="my-nav" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#" >B2B Network</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px'}}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2" className="white-link">Categories</Nav.Link>
            <Nav.Link href="#action" >
              Alerts
            </Nav.Link>
            <NavDropdown title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/Profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Text-post">
                Post
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Chat
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            
             <Button variant="outline-success" className="button-style">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
      <div className="container">
      <h2 className="post-heading">Posts</h2>
      {(props.posts || []).map((post, index) => (
        <div key={index} className="post">
          <h3 className="post-title">Post #{index + 1}</h3>
          <p>{post}</p>
          <button className="delete-button" onClick={() => {
            if (window.confirm('Are you sure you want to delete this post?')) {
              props.deletePost(index);
              alert('Post deleted successfully!');
            }
          }}>Delete</button>
          <Button variant="primary"  className="like-button" onClick={() => handleLike(index)}>
            Like <Badge variant="light">{likes[index]}</Badge>
            
          </Button>
        </div>
      ))}
    </div>
    
  
    <div className="cards-section">
      <div className="cards-container">
     <MyCards name="Smith" role="Writer" about="Hey! This is Smith. I am an experienced Content Writer "/>
      <MyCards name="John" role="Developer" about={"Hey!This is John. Check out my profile"}/>
      <MyCards name="Sophie" role="Artist" about={"Welcome!Check out my profile"}/>
      <MyCards name="Saul" role="Lawyer" about={"Committed a Crime? You Better Call Saul!!"}/>
      </div>
      </div>


    

        </>
    );
}

      
   
function MyCards({name, role,about}){
  let navigate = useNavigate();
  const handleViewProfile = () => {
    navigate('/profile' , { state: { name, role, about } });
  }
  const handleConnect = () => {
    toast('Request sent!', {
      position: "top-center", 
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: 'white', 
      }
    });
  } 
  

  return(
    <>
    <ToastContainer />
   <div className="cards">
      <img src={image} className="image-size" alt="Profile" />
      <h2 className="card-title">{name}</h2>
      <p className="card-text">{role}</p>
      <button className="card-view" onClick={handleViewProfile}>View Profile</button>
      <button className="card-btn" onClick={handleConnect}>Connect</button>
    </div>
    
    </>
  )
}

export default MainPage;




