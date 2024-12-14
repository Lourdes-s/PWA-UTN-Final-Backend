import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import errorHandlerMiddleware from './middlewares/errorHandler.middleware.js'
import userRouter from './routes/user.route.js'
import chatRouter from './routes/chat.route.js'

const PORT = 3000
const app = express()

//cors es un middleware que habilita las consultas de origen cruzadas
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.get('/ping', (req, res) => res.json('pong'))

app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
    console.log(`el servidor se esta ejecutando en http://localhost:${PORT}`)
})