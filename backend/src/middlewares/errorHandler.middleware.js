import AppError from "../helpers/errors/app.error.js";

const errorHandlerMiddleware = (err, req, res, next) => {
    err.status_code = err.status_code || 500
    if (err.is_operational) {
        return res.status(err.status_code).json({
            status: err.status,
            message: err.message
        })
    }

    console.error('Error: ', err)

    return res.status(500).json({
        status: 'error',
        message: 'Algo anda muy mal aqui...'
    })
}

export default errorHandlerMiddleware