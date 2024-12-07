import AppError from "../helpers/errors/app.error.js"
import User from "../model/user.model.js"
import UserRepository from "../repository/user.repository.js"

export const getUserController = async (req, res, next) => {
    try{
        const { id } = req.params

        const user = await UserRepository.getUser(id)
        if(!user){
            next(new AppError("User not found", 404))
            return
        }

        return res.status(201).json(User.createUserPublic(user))
    }
    catch (error){
        next(error)
    }
}