import express from 'express'
import { getChatController, getChatsController, postMessageController } from '../controllers/chat.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const chatRouter = express.Router()

chatRouter.get('/', authMiddleware, getChatsController)
chatRouter.get('/:user_id_contact', authMiddleware, getChatController)
chatRouter.post('/:user_id_contact/message', authMiddleware, postMessageController)

export default chatRouter