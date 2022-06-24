import {useState, useEffect }from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import io from 'socket.io-client'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Card from 'react-bootstrap/Card'
import './homepage.css'


const socket = io.connect('http://localhost:3001')

function Homepage({handleLogout, user}){
    const [rooms, setRooms] = useState([])
    const [roomName, setRoomName] = useState("") 


    const email = user.email
    const username = email.substring(0, email.lastIndexOf("@"))

    const createRoom = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("roomName", roomName)

        axios.post('http://localhost:3001/app/create', formData)
        const roomData = {roomName: roomName}
        await socket.emit('create_room', roomData)
    }


    useEffect(() => {
        axios.get('http://localhost:3001/app/rooms').then((res) => {
            setRooms(res.data)
            
        }).catch(err => err)
    }, [])

    const joinRoom = (roomName, username, id) => {

        const joinData = {room: roomName, name: username, id: id}

        socket.emit('join-room', joinData)
        
    }
   
    
   
    

    return(
        <div className = "homepage">
        <div className = "nav">
            <h1>{username}</h1>
            <Link to = '/login'><Button class = "btn btn-danger" onClick = {handleLogout}>Logout</Button></Link>
        </div>
            <h1 style = {{"text-align":"center"}}>Join a room</h1>

            <Container>
            <Row>
            <Col md={{ span: 6, offset: 3 }}>
                <Form onSubmit={createRoom} encType="multipart/form-data">
                <InputGroup className = "mb-3">
                    <Form.Control placeholder = "Create A Room" onChange = {(event) => {setRoomName(event.target.value)}}></Form.Control>
                    <Button  type = "submit">Create Room</Button>
                </InputGroup>
                </Form>
            </Col>
            </Row>   
            </Container>

            <div className= "room-container">
            <Container>
                <Row xs = {1} md={3} className="g-4">
                {rooms.map((room) => {
                    return(
                        <div>
                        <Col>
                            <Card gap = {3} bg = "info" border = "primary" style={{ width: '18rem', padding: '10px', "text-align": 'center' }} className = "mb-2">
                                <Stack gap = {4}>
                                    <h1>{room.roomName}</h1>
                                    <Link to = {`/${room._id}`}><Button  onClick = {() => {joinRoom(room.roomName, username, room._id)}}>Join Room</Button></Link>
                                </Stack>
                            </Card>
                        </Col>
                        </div>
                    )
                })}
                </Row>
            </Container>
            
            </div>
            
        </div>
    )
}
export default Homepage