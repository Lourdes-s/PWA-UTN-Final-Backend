/* import React, { useEffect, useState } from 'react'

const ContactsHeader = ({setListaContactos}) => {

    const [searchStringState, setSearchString] = useState('')

    useEffect(
        () => {
            setTimeout(
                () => {
                    obtenerContactos()
                        .then(
                            (contacts) => {
                                if (searchStringState) {
                                    const newContactsList = contacts.filter(
                                        contact =>
                                            contact.nombre.toLowerCase().includes(searchStringState.toLocaleLowerCase())
                                    )
                                    setListaContactos(newContactsList)
                                }
                                else {
                                    setListaContactos(contacts)
                                }
                            }
                        )
                },
                500
            )
        },
        [searchStringState]
    )

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
 */