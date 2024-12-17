import { useEffect, useState } from "react"

const useContacts = () => {
    const [contacts_state, setContacts] = useState([])
    const [contacts_loading_state, setContactsLoading] = useState(true)
    const [contacts_error_state, setContactsError] = useState(null)
    const getContacts = async () => {
        const response = await fetch('http://localhost:3000/api/Contacts', {
            method: 'GET',
        })
        const data = await response.json()
        if(!data.ok) {
            setContactsError(data.error)
            setContactsLoading(false)
            return
        }
        else{
            setContacts(data.payload.Contacts)
            setContactsLoading(false)
        }

    }
    useEffect(
        () => {
            getContacts()
        },
        []
    )

    return {
        contacts_state,
        contacts_loading_state,
        contacts_error_state
    }
}

export default useContacts