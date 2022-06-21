import mongoose from 'mongoose';

const Schema = mongoose.Schema



const MessageSchema = Schema({
    message: String,
    sender: String
})

const ChatRoomSchema = Schema({
    roomName: String,
    messages: [MessageSchema]
})

export const ChatRoomModel = mongoose.model("Chatroom", ChatRoomSchema)

export const MessageModel = mongoose.model("Message", MessageSchema)