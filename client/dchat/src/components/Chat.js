import {useState, useEffect} from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import ScrollToBottom from "react-scroll-to-bottom";
import './Chat.css'

const socket = io.connect('http://localhost:3001')



const Chat = ({match, user}) => {
    const [message, setMessage] = useState('')
    const [room, setRoom] = useState({
        roomName: "",
        messages: []
    })

 




    const email = user.email
    const username = email.substring(0, email.lastIndexOf("@"))
    

    const sendMessage = async () => {


        const messageData = {username: username, message: message, id: match.params.id, room: room.roomName}

        await socket.emit('send_message', messageData)
        
        
    }


    const leaveRoom = (room, user) => {
        socket.emit('leave-room', {roomName: room, username: user})
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/app/rooms/${match.params.id}`).then((res) => {
            setRoom(res.data)
    }).catch(err => err)
})


 



       
      

    
    return(
        <div className = "chatRoom">
            <div className = "navbar">
            
                <Link to = '/'><button onClick = {() => {leaveRoom(room.roomName, username)}}>Disconnect</button></Link>
                <h1>{room.roomName}</h1>
            
            </div>


            <div className = "messagelist">
            
                {room.messages.map((message) => {
                    return (
                        <div className = "message-container" id = {message.sender === username ? "you" : "other"} key = {message._id}>
                            <div>
                                <div className= "message-content">
                                    <h4>{message.message}</h4>
                                </div>

                                <div className = "message-sender">
                                    <p>{message.sender}</p>
                                </div>
                                </div> 
                            </div>
                        
                    )
                })}
                
            </div>
            <br/>
            <br/>
            <br/>
                
            
            
            <div className = "chat-text">
                <input onChange = {(event) => {setMessage(event.target.value)}}></input>
                <button onClick = {sendMessage}>Send Message</button>
            </div>
                
        </div>
    )
}
export default Chat