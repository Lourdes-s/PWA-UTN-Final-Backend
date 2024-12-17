import React, { useEffect, useState } from 'react'

const ContactScreen = () => {
    const [contactListState, setContactList] = useState([])
    const [isLoadingState, setIsLoading] = useState(true)

const handleContacts = async () => {
    const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
    const data = await responseHTTP.json()
    return { responseHTTP, data }
}

    useEffect(
        () =>{
            setTimeout(
                () => {
                handleContacts()
            .then(
                ({data}) => {
                    setContactList(data)
                    setIsLoading(false)
                }
            )
                },
                2000
            )
            
        },
        []
    )
    return (
        <div style={{height:'100%'}}>
            <ContactsHeader setContactList={(contacts) => setContactList(contacts)}/>
            <Contacts contacts={contactListState} isLoading={isLoadingState}/>
        </div>
    )
}


export default ContactScreen