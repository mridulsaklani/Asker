import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <div className="bg-blue-500 py-4 text-white ">
        <div className="max-w-7xl mx-auto flex items-center ">
           <div>
            <Link to={'/'} className='text-white font-bold text-xl tracking-wide'>ASKER</Link>
           </div>
        </div>
      </div>
    </>
  )
}

export default Navbar