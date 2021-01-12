import React, { useCallback, useRef} from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from '../features/cameraSlice';
import { useHistory } from 'react-router-dom';
import './WebcamCapture.css'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
const videoConstraints={
    width:250,
    height:400,
    facingMode:"user"
}
function WebcamCapture() {
    const dispatch=useDispatch()
    const history=useHistory()
    const webcamRef=useRef(null)
    const capture=useCallback(()=>{
        const imageSource=webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSource))
        history.push('/preview')
    },[webcamRef])
    const openChat=()=>{
        history.push('/chats')
    }
    return (
        <div className='webcamCapture'>
           
            <Webcam audio={false} height={videoConstraints.height} ref={webcamRef}
            screenshotFormat="image/jpeg" width={videoConstraints.width} videoConstraints={videoConstraints}
            ></Webcam>
             <RadioButtonUncheckedIcon className='webcamCapture__button' onClick={capture} fontSize="large"></RadioButtonUncheckedIcon>
             <ChatBubbleIcon className='webcamCapture__chat' onClick={openChat} fontSize="small"></ChatBubbleIcon>
        </div>
    )
}

export default WebcamCapture
