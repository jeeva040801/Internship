import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import SignUp from './components/signup';
import MainPage from './components/main-page';
import './App.css';
import ProfilePage from './components/ProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextPost from './components/Text-post';
import { useState } from 'react';
import { useEffect } from 'react';
import Profile from './components/Profile';

function App() {
  const [posts, setPosts] = useState([]);
  const addPost = (post) => {
    const newPosts = [...posts, post];
    setPosts(newPosts);
    localStorage.setItem('posts', JSON.stringify(newPosts));
  };
  const deletePost = (index) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
    localStorage.setItem('posts', JSON.stringify(newPosts));
  };
  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main-page" element={<MainPage posts={posts} deletePost={deletePost} />} />
        <Route path="/profile" element={<ProfilePage />} />
        
        <Route path="/Text-post" element={<TextPost addPost={addPost} />} />
        <Route path="/Profile" element={Profile} />
      
    
        
      </Routes>
    </Router>
    
    </>
  );
}

export default App;