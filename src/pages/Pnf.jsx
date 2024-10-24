import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
    <>
    <Header/>
     <div style={{paddingTop:"100px",height:"80vh"}} className='flex justify-center items-center flex-col'>
        <img style={{width:"450px"}} src="https://i.pinimg.com/originals/11/dc/96/11dc96d2e4daca3ea8ff6aa41299b5e1.gif" alt="" />
        <Link className='bg-blue-600 p-2 mt-3 text-white rounded' to={'/'}>Home</Link>
     </div>
     
    </>
  )
}

export default Pnf