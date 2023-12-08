import React, { useEffect, useState } from 'react'
import './BookCard.css'
import { Link } from 'react-router-dom'


const BookCard = ({ _id, name, price, productImg}) => {
const [user, setUser] = useState();

const loadUser = ()=>{
  setUser(JSON.parse(localStorage.getItem('user')))
}

 useEffect(()=>{
  loadUser();
 },[])
  return (
        
    <div>

      <div className='product-card'>

        <img src={productImg} alt={name} className='product-img' />
        <h2 className='product-name'>{name}</h2>
        {/* <p className='product-description'>{description}</p> */}
        <p className='product-price'> ₹ {price} /-</p>

        {
          user ?  <Link className='button buy-now-btn '

          onClick={() => {
            window.location.href = `/booknow/${_id}`
          }}

        >Book now</Link>
        
        : <Link className='button buy-now-btn '

        onClick={() => {
          window.location.href = `/login`
        }}


      >login to Book</Link>

        }

      </div>
    </div>
  )
}

export default BookCard