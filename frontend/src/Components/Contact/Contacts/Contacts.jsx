import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import './Contacts.css'
import useInfiniteScrolling from '../../../Hooks/useInfiniteScrolling'

const Contacts = () => {
    const [products, setProducts] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(0)

    const getPage = useCallback(async () => {
        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}/api/chat?page=${page}&per_page=${5}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('access-token')}`
                }
            }
        )
        const data = await responseHTTP.json()
        console.log(data)
        if (data.length === 0) {
            setHasMore(false)
          } else {
            setProducts((prevProducts) => [...prevProducts, ...data])
            setPage((prevPage) => prevPage + 1)
        }
    }, [page])


    const { loadMoreRef } = useInfiniteScrolling(getPage, hasMore)

    return (
        <div className='contacts-container'>
            {
                products.map(contact =>{
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
            {
            hasMore //cargando
                && <div ref={loadMoreRef} className="wrapper">
                    <div className="loader">
                        <div className="loading one"></div>
                        <div className="loading two"></div>
                        <div className="loading three"></div>
                        <div className="loading four"></div>
                    </div>
                </div>
            }
        </div >
    )
}

export default Contacts