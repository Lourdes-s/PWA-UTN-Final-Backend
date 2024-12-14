const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const verifyString = (field_name, field_value) => {
    if(!(typeof(field_value) === 'string')){
        return {
            error: 'STRING_VALIDATION',
            message: field_name + ' debe ser un texto',
        }
    }
}

export const verifyNumber = (field_name, field_value) => {
    if(!(typeof field_value === 'number')){
        return {
            error: 'NUMBER_VALIDATION',
            message: field_name + ' debe ser un numero',
        }
    }
}

export const verifyMinLength = (field_name, field_value, minLength) => {
    if(!(field_value.length >= minLength)){
        return {
            error: 'MIN_LENGTH_VALIDATION',
            message: field_name + ' debe tener como minimo ' + minLength + ' caracteres',
        }
    }
}

export const verifyMaxLength = (field_name, field_value, maxLength) => {
    if(!(field_value.length <= maxLength)){
        return {
            error: 'MAX_LENGTH_VALIDATION',
            message: field_name + ' debe tener como maximo ' + maxLength + ' caracteres',
        }
    }
}

export const verifyEmail = (field_name, field_value) => {
    if(!(emailRegex.test(field_value))){
        return {
            error: 'EMAIL_VALIDATION',
            message: field_name + ' no cumple el formato email'
        }
    }
}

export const verifyValidator = (validator) => {
    const errors = []
    for (let field_name in validator) {
        for (let validation of validator[field_name].validation) {
            let result = validation(field_name, validator[field_name].value)
            if (result) {
                errors.push(result)
            }
        }
    }

    if (errors.length != 0) {
        return errors
    } 
    return undefined
}