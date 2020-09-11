import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


firebase.initializeApp(firebaseConfig);



function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })



  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user
      console.log(displayName, photoURL, email);
      
      const signInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signInUser);
      console.log(displayName, photoURL, email);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        photo: '',
        email: '',
      }
      setUser(signedOutUser)
      
    }) 
    .catch(err => {
      
    });
     
  }
  const handleBlur = (e) => {
    let isFormValid; 
    // console.log(e.target.value, e.target.name)
    if (e.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
      console.log(isEmailValid);
    }
    if (e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      console.log(isPasswordValid && passwordHasNumber);    
    }

  }
  const handleSubmit = () => {

  }
  return (
    <div className="App">
    {
      user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
      <button onClick={handleSignIn}>Sign in</button>
      
    }
    {
      user.isSignedIn && <div>
      <p> Welcome, {user.name} </p>
      <p>Your email: {user.email}</p>
      <img src={user.photo} alt=""/>
      </div>
    }



    <h1>Our own authentication</h1>
    <form onSubmit={handleSubmit}>
          <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
          <br/>
          <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required/> 
          <br/>
          <input type="submit" value="Submit"/>    
    </form>
    </div>
  );
}

export default App;
