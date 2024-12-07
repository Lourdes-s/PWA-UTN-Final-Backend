import AppError from "../helpers/errors/app.error.js"
import { verifyEmail, verifyMinLength, verifyString, verifyValidator } from "../helpers/validations.helpers.js"
import bcrypt from "bcrypt"
import UserRepository from "../repository/user.repository.js"
import User from "../model/user.model.js"
import jwt from 'jsonwebtoken'
import ENVIROMENT from "../config/eviroment.js"
import { sendResgisterMail } from "../helpers/mail.helpers.js"

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

        const validationToken = jwt.sign({ email: email }, ENVIROMENT.SECRET_KEY, { expiresIn: '1d' })
        const result = await sendResgisterMail(validationToken, email)

        const hashedPassword = await bcrypt.hash(password, 10)
        const userId = await UserRepository.createUser(User.createUserLogin(name, email, hashedPassword, true, false))

        return res.status(201).json({})
    }
    catch (err){
        console.error(err)
        res.sendStatus(500)
    }
}

export const verifyEmailController = async (req, res) => {
    try {
        const { validation_token } = req.params
        console.log(validation_token)

        const payload = jwt.verify(validation_token, ENVIROMENT.SECRET_KEY)
        const emailToVerify = payload.email
        const userToVerify = await UserRepository.getUserByEmail(emailToVerify)
        userToVerify.verify_email = true

        await UserRepository.updateUser(userToVerify)
        res.redirect('http://localhost:5173/login')
    }
    catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}
