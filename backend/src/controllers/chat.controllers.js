import AppError from "../helpers/errors/app.error"
import { verifyMaxLength, verifyString, verifyValidator } from "../helpers/validations.helpers"
import ChatRepository from "../repository/chat.repository"

export const getChatsController = async (req, res, next) => {
    try{
        const { page, per_page } = req.query

        const chats = await ChatRepository.getChats(req.user.id, page, per_page)

        return res.status(200).json(chats)
    }
    catch (error){
        next(error)
    }
}

export const getChatController = async (req, res, next) => {
    try{
        const { page, per_page } = req.query
        const { user_id_contact } = req.params

        //TODO maybe check if req.user.id is contact with user_id_contact

        const messages = await ChatRepository.getChat(req.user.id, user_id_contact, page, per_page)

        return res.status(200).json(messages)
    }
    catch (error){
        next(error)
    }
}

const validatePostMessage = (content) => {
    const validator = {
        name: {
            value: content,
            validation: [
                verifyString,
                (field_name, field_value) => verifyMaxLength(field_name, field_value, 255)
            ]
        }
    }
    return verifyValidator(validator)
}

export const postMessageController = async (req, res, next) => {
    try{
        const { user_id_contact } = req.params
        const { content } = req.body

        const errors = validatePostMessage(content)
        if (errors !== undefined) {
            next(new AppError(errors, 400))
            return
        }

        const messageId = await ChatRepository.createMessage({
            issurer_id: req.user.id, 
            receiver_id: user_id_contact, 
            content: content
        })

        return res.sendStatus(201)
    }
    catch (error){
        next(error)
    }
}