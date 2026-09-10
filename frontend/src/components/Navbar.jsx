import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CardContext'

const Navbar = () => {
    const {cartItems}=useCart();
    const cartCount=cartItems.reduce((total,item)=>total+item.quantity,0)
  return (
    <nav className='bg-white shadow-medium px-6 py-4 flex justify-between items-center w-full top-0 z-50'>
        <Link to='/' className='text-2xl font-bold text-grey-800'>🛒My cart</Link>
        <Link to='/cart' className='relative text-grey-800 hover:text-grey-600 font-medium'>
        🛒Cart {
            cartCount>0 && (
                <span className='absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center '>
                    {cartCount}
                </span>
            )
        }
        </Link>
    </nav>
  )
}

export default Navbar