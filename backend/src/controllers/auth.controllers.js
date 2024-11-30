import AppError from "../helpers/errors/app.error.js"
import { verifyEmail, verifyMinLength, verifyString, verifyValidator } from "../helpers/validations.helpers.js"
import bcrypt from "bcrypt"
import UserLogin from "../model/userLogin.model.js"
import UserRepository from "../repository/user.repository.js"

const validate = (name, password, email) => {
    const validator = {
        name: {
            value: name,
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 5)
            ]
        },
        password: {
            value: password,
            validation: [
                verifyString,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        },
        email: {
            value: email,
            validation: [
                verifyEmail,
                (field_name, field_value) => verifyMinLength(field_name, field_value, 10)
            ]
        }
    }
    return verifyValidator(validator)
}

export const registerController = async (req, res, next) => {
    try{
        const { name, password, email } = req.body
        const errors = validate(name, password, email)
        if (errors !== undefined) {
            next(new AppError(errors, 400))
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        UserRepository.saveUser(new UserLogin(name, email, hashedPassword))

        //send email de veificacion

        return res.status(201).json({})
    }
    catch (err){
        console.error(err)
    }
}
