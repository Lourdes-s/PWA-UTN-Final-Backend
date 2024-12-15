import { useState } from "react"

const useForm = (initialForm) => {
    //logica de formularios y estados
    const [formState, setFormState] = useState(initialForm)
    const handleChange = (evento) => {
        evento.target // es el elemento HTML que emitio el evento
        evento.target.value // el valor del elemento HTML que emitio el evento (el input)

        const field_name = evento.target.name
        const field_value = evento.target.value

        setFormState((prevFormState) => {
            return {...prevFormState, [field_name]: field_value}
        })
    }
    return {
        formState, 
        handleChange
    }
}

export default useForm 