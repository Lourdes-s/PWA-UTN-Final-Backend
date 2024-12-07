import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/eviroment.js'

const authMiddleware = (req, res, next) => {
    try {
        const auth_header = req.headers['authorization'] 

        if (!auth_header) {
            return res.status(401).json({ message: 'Falta el token de autorizacion' })
        }
        const access_token = auth_header.split(' ')[1]

        if (!access_token) {
            return res.status(401).json({ message: 'El token de autorizacion esta malformado' })
        }

        const userDecoded = jwt.verify(access_token, ENVIROMENT.SECRET_KEY)
        req.user = userDecoded.userPublic

        next()
    }
    catch (error) {
        console.error(error)
        res.status(401).json({ message: 'El token de autorizacion no es valido' })
    }
}

export default authMiddleware