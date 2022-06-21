import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import AppRoutes from './routes/router.js'
import mongoose from 'mongoose'
import {ChatRoomModel, MessageModel} from './models/chatModels.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello database')
})

app.use('/app', AppRoutes)


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    } 
})
 

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})


io.on('connection', (socket) => {
    console.log('Connection On')

    socket.on('join-room', async(data) => {
        try{
            let result = await ChatRoomModel.findById(data.id)
            console.log(`${data.name} has joined room ${data.room}`)
            console.log(`${data.id}`)
            
            socket.join(data)
            socket.activeRoom = data
        }
        catch(err){
            console.log(err)
        }
        
    })
 
  

    socket.on('create_room', (data) => {
        console.log(data.roomName)
    })

    socket.on('disconnect', () => {
        console.log(`user is disconnected from ${socket.id}`)
    }) 

    socket.on('send_message', async (data) => {
        console.log('someone has just sent a message')
        const newMessage = new MessageModel({
            message: data.message,
            sender: data.username
        })
    
        const Room = await ChatRoomModel.findById(data.id)
        Room.messages.push(newMessage)
        Room.save()
       
        
        console.log(data)
        socket.to(data.room).emit('receive_message', Room)
    })

    socket.on('leave-room', (data) => {
        socket.leave(data.room)
        console.log(`${data.username} has left ${data.roomName}`)
    })
})

server.listen(process.env.PORT, () => {
    console.log('server is running')
})

