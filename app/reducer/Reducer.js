"use client"

export const initialState = {
    cart:[]
}

function Reducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART":
            const FindIndexItem = state.cart.findIndex((item)=>item._id === action.payload._id)

            if (FindIndexItem !== -1) {
                const newCart = [...state.cart]
                newCart[FindIndexItem].quantity++
                return {...state, cart:newCart}
            }
            else{
                return {...state, cart:[...state.cart, {...action.payload, quantity:1}]}
            }

        case "REMOVE_FROM_CART":
            const RemoveFilterItem = state.cart.filter((item)=> item._id !== action.payload._id)
            return {...state, cart: RemoveFilterItem}

        case "INCREASE_QUANTITY":
            const FindIncrease = state.cart.findIndex((item)=>item._id === action.payload._id)
            if (FindIncrease !== -1) {
                const newCart = [...state.cart]
                newCart[FindIncrease].quantity++
                return {...state, cart: newCart}
            }
        case "DECREASE_QUANTITY":
            const FindDecrease = state.cart.findIndex((item)=>item._id === action.payload._id)
            if (FindDecrease !== -1 && state.cart[FindDecrease].quantity > 1) {
                const newCart = [...state.cart]
                newCart[FindDecrease].quantity--
                return {...state, cart: newCart}
            }

        case "CLEAR_CART":
            return {...state, cart:[]}

        case "UPDATE_CART":
            return { ...state, cart: action.payload };
            
        default:
            return state
    }
}

export default Reducer
