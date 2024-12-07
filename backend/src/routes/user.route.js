import express from 'express'
import { getUserController } from '../controllers/user.controllers.js'

const userRouter = express.Router()

userRouter.get('/:id', getUserController)

export default userRouter