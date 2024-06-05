import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        addToCart: (state, action) => {


            state.cart = [...state.cart, { ...action.payload, quantity: 1 }];

        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id == action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find(item => item.id == action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        }
    },
})

export const { setCart, addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions

export default cartSlice.reducer
