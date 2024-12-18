import React, { useRef} from 'react'
import useInfiniteScrolling from '../../Hooks/useInfiniteScrolling'
import { ContactsHeader, Contacts } from '../../Components'
import '../Screens.css'

const ChatsScreen = () => {
    return (
        <div style={{height:'100%'}}>
            <ContactsHeader/>
            <Contacts/>
        </div>
    )
}


export default ChatsScreen