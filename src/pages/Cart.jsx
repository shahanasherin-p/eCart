import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decrementQuantity, emptyCart, incrementQuantity, removerCartItem } from '../redux/slices/cartSlice'

const Cart = () => {
const navigate=useNavigate()
const userCart=useSelector(state=>state.cartReducer)
const  [cartTotal,setCartTotal]=useState(0)

const dispatch=useDispatch()

useEffect(()=>{
  if(userCart?.length>0)
{setCartTotal(userCart?.map(item=>item.totalPrice)?.reduce((a,b)=>a+b)) }
},[userCart])

const handleDecementQuantity=(product)=>{
  if(product?.quantity>1){
    dispatch(decrementQuantity(product))
  }else{
    dispatch(removerCartItem(product.id))
  }
}

const handleCheckOut=()=>{
  dispatch(emptyCart())
  alert("Order Confirmed...Thank you for purchasing shop more!!")
  navigate('/')
}

  return (
    <>
  <Header/>
  <div style={{paddingTop:'100px'}} className="container py-52 px-4 mx-auto">
   {
    userCart?.length>0?
    <>
    <h1 className='text-5xl text-cyan-600 font-bold'>Cart Summary</h1>
    <div className="grid grid-cols-3 my-5 gap-4">
      <div className="col-span-2 shadow rounded border p-5">
        <table className='table-auto  w-full '>
          <thead>
           <tr>
              <td className="font-semibold">#</td>
              <td className="font-semibold">Name</td>
              <td className="font-semibold">Image</td>
              <td className="font-semibold">Quantity</td>
              <td className="font-semibold">Price</td>
              <td className="font-semibold">⁝</td>
           </tr>
          </thead>
          <tbody>
           { userCart?.map((item,index)=>(
            <tr key={item.id}>
              <td>{index+1}</td>
              <td>{item.title}</td>
              <td><img width={'80px'} height={'80px'} src={item.thumbnail} alt="" /></td>
              <td className='w-fit'>
                <div className="flex">
                  <button onClick={()=>handleDecementQuantity(item)} className="p-5 font-bold">-</button>
                  <input style={{width:'40px',height:'50px'}} className='border mt-3 rounded ps-4 ms-2 me-2' type='text' readOnly value={item?.quantity} />
                  <button onClick={()=>dispatch(incrementQuantity(item))} className="p-5 font-bold ">+</button>
  
                </div>
              </td>
              <td>${item?.totalPrice}</td>
              <td><button onClick={()=>dispatch(removerCartItem(item?.id))} className='text-red-600'><i className="fa-solid fa-trash"></i></button></td>
            </tr>
           ))
            
            }
          </tbody>
        </table>
        <div className="float-right mt-4">
          <button onClick={()=>dispatch(emptyCart())} className='bg-red-600 text-white p-2 rounded me-3'>Empty Cart</button>
          <Link to={'/'} className='bg-cyan-600 text-white p-2 rounded me-3'>Shop More</Link>
        </div>
      </div>
      
      <div className="col-span-1  p-5">
        <div className='shadow rounded border p-5'>
          <h1 className="text-3xl font-bold text-center">Total Amount : <span className='text-red-700'>${cartTotal}</span></h1>
          <button onClick={handleCheckOut} className="bg-cyan-600 rounded p-5 w-full text-white font-bold mt-5 text-xl">Checkout</button>
        </div>
      </div>
    </div>
  </>
  :
  <div className="flex flex-col mt-24 justify-center items-center">
          <img className='w-60' src="https://estore.mv/Images/Cart/emptycart.png" alt="" />
          <h1 className="text-cyan-700 font-bold">Your Cart is Empty</h1>
        </div>
   }
  </div>
    </>
  )
}

export default Cart