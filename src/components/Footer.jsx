import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const date = new Date().getFullYear()
  return (
    <>
      <div className='w-full bg-blue-600 py-4 fixed bottom-0'>
        <div className="max-w-7xl mx-auto flex justify-center">
           <p className='text-white font-medium tracking-wide'> &copy; {date} | by: <Link to={'https://mridulsinghsaklani.com'} target='_blank' className='underline font-normal hover:scale-101 transition-all duration-300'> mridulsinghsaklani.com</Link>    </p>
        </div>

      </div>
    </>
  )
}

export default Footer