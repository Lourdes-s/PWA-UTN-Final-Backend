import React, { useState } from 'react'
import './ContactsHeader.css'

const ContactsHeader = ({setListaContactos}) => {

    const [searchStringState, setSearchString] = useState('')


    const handleChangeValue = (e) => {
        setSearchString(e.target.value)
    }

    return (
        <div className='contact-header-container'>
            <div className='contact-header-title'>
                <h2 className='contacts-header-contact'>Contactos</h2>
            </div>
            <input
                className='input-filter'
                placeholder='Buscar contacto'
                onChange={handleChangeValue}
                value={searchStringState}
            />
        </div>
    )
}

export default ContactsHeader