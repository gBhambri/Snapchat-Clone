import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './Components/WebcamCapture';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Preview from './Components/Preview';
import Chats from './Components/Chats';
import ChatView from './Components/ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Components/Login';
import { auth } from './Firebase/firebase';

function App() {
  const user=useSelector(selectUser)
  const dispatch=useDispatch()
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser)
      {
        dispatch(login({
          username:authUser.displayName,
          profilePic:authUser.photoURL,
          id:authUser.uid
        }))
      }
      else
      {
        dispatch(logout())
      }
    })
  },[])
  return (
    <div className="app">
      <Router>
        {!user?<Login></Login>:
        <>
        <img className='app__logo' src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt=""></img>
          <div className='app__body'>
            <div className='app__bodyBackground'>
            <Switch>
            <Route exact path="/">
              <WebcamCapture></WebcamCapture>
            </Route>
            <Route path="/preview">
              <Preview></Preview>
            </Route>
            <Route path="/chats/view">
          <ChatView></ChatView>
            </Route>
            <Route path="/chats">
            <Chats></Chats>
            </Route>
          </Switch>
            </div>
        </div>
        </>
        }
      
    </Router>
     
    </div>
  );
}

export default App;
