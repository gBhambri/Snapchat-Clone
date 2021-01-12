import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetCameraImage, selectCameraImage } from '../features/cameraSlice'
import './Preview.css'
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import {v4 as uuid} from 'uuid'
import {db, storage} from '../Firebase/firebase'
import firebase from 'firebase'
import { selectUser } from '../features/appSlice'
function Preview() {
    const cameraImage=useSelector(selectCameraImage)
    const history=useHistory()
    const dispatch=useDispatch()
    const user=useSelector(selectUser)
    console.log(user)
    const sendPost=()=>{
        const id=uuid();
        const uploadTask=storage.ref(`posts/${id}`).putString(cameraImage,"data_url")
        uploadTask.on('state_changed',null,(error)=>{
            console.log(error)
        },()=>{
            storage.ref('posts').child(id).getDownloadURL().then(url=>{
                db.collection('posts').add({
                    imageUrl:url,
                    username:user.username,
                    read:false,
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    profilePic:user.profilePic
                })
                history.replace('/chats')
            })
        })
    }
    const closePreview=()=>{
        dispatch(resetCameraImage())
    }
    useEffect(()=>{
        if(!cameraImage)
        {
            history.replace('/')
        }
    },[cameraImage,history])
    return (
        <div className='preview'>
            <CloseIcon className='preview__closeIcon' onClick={closePreview}></CloseIcon>
            <div className='preview__toolbarRight'>
                <TextFieldsIcon></TextFieldsIcon>
                <CreateIcon></CreateIcon>
                <NoteIcon></NoteIcon>
                <MusicNoteIcon></MusicNoteIcon>
                <AttachmentIcon></AttachmentIcon>
                <CropIcon></CropIcon>
                <TimerIcon></TimerIcon>
            </div>
            <img src={cameraImage} alt="Clicked"></img>
            <div onClick={sendPost} className='preview__Footer'>
                <h2>Send Now</h2>
                <SendIcon fontSize='small' className='preview__sendIcon'></SendIcon>
            </div>
        </div>
    )
}

export default Preview
