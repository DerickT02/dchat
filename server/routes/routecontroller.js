import {ChatRoomModel, MessageModel} from '../models/chatModels.js'

export const getRooms = async (req, res) => {
    try{
        const rooms = await ChatRoomModel.find()
        res.json(rooms)
    }
    catch (err){
        res.json(err)
    }
}

export const createRoom = async (req, res) => {
    
        const roomName = req.body.roomName

        const Room = new ChatRoomModel({
            roomName: roomName,
            messages: []
        })

    Room.save().then(result => {
        res.json(result)
    }).catch(err => {
        res.json(err)
    })
}

export const joinRoom = async (req, res) => {
const id = req.params.id

    try{
        const Room = await ChatRoomModel.findById(id)
        res.json(Room)
    }
    catch(err){
        res.json(err)
    }
}

export const sendMessage = async (req, res) => {
    const id = req.params.id;
    const message = req.body.message;
    const sender = req.body.sender;

    const newMessage = new MessageModel({
        message: message,
        sender: sender
    })

    const Room = await ChatRoomModel.findById(id)

    try{
        Room.messages.push(newMessage)
        Room.save()
       
    }
    catch(err){
        res.json(err)
    }
}

export const getOneRoom = async (req, res) => {
    const id = req.params.id
  
    try{
        const Room = await ChatRoomModel.findById(id)
        res.json(Room)
    }  
    catch(err){
        res.json(err)
    }
}