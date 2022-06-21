import multer from "multer";
import { getRooms, createRoom, sendMessage, getOneRoom } from "./routecontroller.js";
import express from 'express';

const upload = multer()
const router = express.Router();

router.get('/rooms', getRooms)

router.get('/rooms/:id', getOneRoom)

router.post('/create', upload.none(), createRoom)

router.patch('/rooms/:id/send', upload.none(), sendMessage)
export default router