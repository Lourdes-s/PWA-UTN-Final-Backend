import nodemailer from 'nodemailer'
import ENVIROMENT from "../config/eviroment.js"

const trasporterEmail = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: ENVIROMENT.EMAIL_USER,
        pass: ENVIROMENT.EMAIL_PASSWORD,
    }
})

export const sendResgisterMail = async (validationToken, email) => {
    const redirectUrl = `http://localhost:3000/api/auth/verify-email/` + validationToken
    const result = await trasporterEmail.sendMail({
        subject: 'Valida tu email',
        to: email,
        html: `
            <h1>Valida tu mail</h1>
            <p>Para validar tu mail da click <a href='${redirectUrl}'>aqui</a></p>
        `
    })
    return result
}