import React, {useState} from 'react'
import { Form } from '../../Components'
import { Link, useNavigate } from 'react-router-dom'

const RegisterScreen = () => {

    const [errorState, setErrorState] = useState({
        name: undefined,
        email: undefined,
        password: undefined
    })

    const form_fields = [
        {
            label_text: 'Nombre de usuario:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                type: 'text',
                id: 'name',
                name: 'name'
            }
        },
        {
            label_text: 'Email:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                type: 'email',
                id: 'email',
                name: 'email',
                placeholder: 'joedoe@example.com'
            }
        },
        {
            label_text: 'Contraseña:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                type: 'password',
                id: 'password',
                name: 'password',
                placeholder: 'Cosme Fulanito' 
            }
        }
    ]

    const initial_state_form = {
        name: '',
        email: '',
        password: ''
    }

    const navigate = useNavigate()


    const handlerRegister = async (formState) => {
        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
            }
        )
        const data = await responseHTTP.json()

        switch (responseHTTP.status) {
            case 400:
                setErrorState(data.message)
                break;
            case 200:
                navigate('/login')
                break;
        }
    }

    return (
        <div>
            <h1>Registrate aqui</h1>
            <Form form_fields={form_fields} action={handlerRegister} initial_state_form={initial_state_form} error={errorState}>
                <button type='submit'>Registrar</button>
            </Form>
                <Link to='/login'>Iniciar sesion</Link>
        </div>
    )
}

export default RegisterScreen