import express from 'express'
import { getUserController } from '../controllers/user.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const userRouter = express.Router()

userRouter.get('/:id', authMiddleware, getUserController)

export default userRouter