class AppError extends Error {
    constructor(message, status_code) {
        super(message)
        this.message = message
        this.status_code = status_code
        this.status = String(status_code).startsWith('4') ? 'fail' : 'error'
        this.is_operational = true
    }
}

export default AppError