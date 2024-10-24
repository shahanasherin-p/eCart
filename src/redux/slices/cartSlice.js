import { createSlice } from "@reduxjs/toolkit";

const cartSlice =createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addToCart:(state,dataFromview)=>{
            const existingProduct=state.find(item=>item.id==dataFromview.payload.id)
            if(existingProduct){
                existingProduct.quantity++
                existingProduct.totalPrice=existingProduct.quantity*existingProduct.price
                const remainingProducts=state.filter(item=>item.id!=existingProduct.id)
                state=[...remainingProducts,existingProduct]

            }
            else{
                state.push({...dataFromview.payload,quantity:1,totalPrice:dataFromview.payload.price})
            }
        },
        removerCartItem:(state,dataFromCart)=>{
            return state.filter(item=>item.id!==dataFromCart.payload)
        },
        incrementQuantity:(state,actionFromCart)=>{
            const existingProduct=state.find(item=>item.id==actionFromCart.payload.id)
            existingProduct.quantity++
            existingProduct.totalPrice=existingProduct.quantity*existingProduct.price
            const remainingProducts=state.filter(item=>item.id!=actionFromCart.payload.id)
            state=[...remainingProducts,existingProduct]
        },
        decrementQuantity:(state,actionFromCart)=>{
            const existingProduct=state.find(item=>item.id==actionFromCart.payload.id)
            existingProduct.quantity--
            existingProduct.totalPrice=existingProduct.quantity*existingProduct.price
            const remainingProducts=state.filter(item=>item.id!=actionFromCart.payload.id)
            state=[...remainingProducts,existingProduct]
        },
        emptyCart:(state)=>{
            return state=[]
        }
    }
})

export const {addToCart,removerCartItem,incrementQuantity,decrementQuantity,emptyCart}=cartSlice.actions
export default cartSlice.reducer