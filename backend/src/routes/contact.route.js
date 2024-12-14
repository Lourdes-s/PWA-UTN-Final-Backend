import express from 'express'
import authMiddleware from '../middlewares/auth.middleware'
import { getContactsController, postContactController } from '../controllers/contact.controllers'

const contactRouter = express.Router()

contactRouter.get('/', authMiddleware, getContactsController)
contactRouter.post('/', authMiddleware, postContactController)

export default contactRouter