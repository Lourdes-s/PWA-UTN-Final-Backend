import React, {useState} from 'react'
import useForm from '../Hooks/useForm.jsx'
import { Link, useNavigate } from 'react-router-dom'

const RegisterScreen = () => {

    const [errorState, setErrorState] = useState({
        name: undefined,
        email: undefined,
        password: undefined
    })

    const form_fields = [
        {
            label_text: 'Ingresa un nombre de usuario:',
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
        },
        {
            label_text: 'Ingresa el email:',
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
            label_text: 'Ingresa la contraseña:',
            field_component: 'INPUT',
            field_container_props: {
                className: 'row_field'
            },
            field_data_props: {
                type: 'text',
                id: 'name',
                name: 'name'
            }
        }
    ]




    const initial_state_form = {
        name: '',
        email: '',
        password: ''
    }

    const navigate = useNavigate()


    const handlerRegister = async (event) => {
        event.preventDefault() 

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

        if(!data.ok){
            if(data.data.registerState.name.errors){
                setErrorState((prevstate) => {
                    return {...prevstate, name: data.data.registerState.name.errors}
                })
            }
        }
        else{
            navigate('/login')
        }
    }

    return (
        <div>
            <h1>Registrate aqui</h1>
            <form onSubmit={handlerRegister}>
                <div>
                    <label>Ingresa tu nombre:</label>
                    <input 
                        type='text' 
                        id='name' 
                        name='name' 
                        placeholder='Cosme Fulanito' 
                        onChange={handleChange} 
                        value={formState.name}
                    />
                    {
                        errorState.name && <span>{errorState.name}</span>
                    }
                </div>
                <div>
                    <label>Ingresa tu email:</label>
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='cosmefulanito@gmail.com' 
                        onChange={handleChange} 
                        value={formState.email}
                    />
                    {
                        errorState.email && <span>{errorState.email}</span>
                    }
                </div>
                <div>
                    <label>Ingresa tu contraseña:</label>
                    <input 
                        type='password' 
                        id='password' 
                        name='password' 
                        placeholder='Tu_contraseña' 
                        onChange={handleChange} 
                        value={formState.password}
                    />
                    {
                        errorState.password && <span>{errorState.password}</span>
                    }
                </div>
                <button type='submit'>Registrar</button>
                <Link to='/forgot-password'>Olvide mi contraseña</Link>
            </form>
        </div>
    )
}

export default RegisterScreen