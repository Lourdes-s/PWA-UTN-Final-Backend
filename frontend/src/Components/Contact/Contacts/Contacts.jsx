import React from 'react'
import { Link } from 'react-router-dom'


const Contacts = ({contacts, isLoadingState}) => {

    return (
        <div className='contacts-container'>
            {
                isLoadingState //cargando
                ?<div className="wrapper">
                <div className="loader">
                    <div className="loading one"></div>
                    <div className="loading two"></div>
                    <div className="loading three"></div>
                    <div className="loading four"></div>
                </div>
                </div>
                :contacts.map(contact =>{
                    return(
                        <Link className='contact-list' to = {'/chat/' + contact.id} key={contact.id}>
{/*                             <img className='profile-pic-contacts' src= {contact.thumbnail} alt='foto de perfil' /> */}
                            <div className='text-contacts'>
                                <span className='contact-name'>{contact.username}</span>
                                <p className='contact-mensaje-text'> {contact.content}</p>
                                <span className='contact-time'>{contact.created_at}</span>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Contacts