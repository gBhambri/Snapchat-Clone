import React from 'react'
import { Avatar } from '@material-ui/core'
import './Chat.css'
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import ReactTimeago from 'react-timeago';
import { useDispatch } from 'react-redux';
import { selectImage } from '../features/appSlice';
import { db } from '../Firebase/firebase';
import { useHistory } from 'react-router-dom';
function Chat({id,username,timestamp,profilePic,read,imageUrl}) {
    const dispatch=useDispatch()
    const history=useHistory()
    const openPic=()=>{
        if(!read)
        {
            dispatch(selectImage(imageUrl))
            db.collection('posts').doc(id).set({
                read:true
            },{merge:true})
            history.push('/chats/view')
        }
    }
    return (
        <div onClick={openPic} className='chat'>
           <Avatar className='chat__avatar' src={profilePic}></Avatar>
           <div className='chat__info'>
               <h4>{username}</h4>
               <p>{ !read && `Tap to view -` }<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}></ReactTimeago></p>
           </div>
            {!read && <StopRoundedIcon className='chat__readIcon'></StopRoundedIcon>}
        </div>
    )
}

export default Chat
