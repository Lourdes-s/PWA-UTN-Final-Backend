import express from 'express'
import cors from 'cors'

const PORT = 3000
const app = express()

//cors es un middleware que habilita las consultas de origen cruzadas
app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`el servidor se esta ejecutando en http://localhost:${PORT}`)
})