import React, { createContext, useState, useContext } from 'react'
import {
  addToCart,
  removeFromCart,
  viewCart,
  clearCart,
  checkout,
  getCartSummary
} from '../api/cartApi'

const CartContext = createContext()

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]) // Stores the cart items
  const [cartSummary, setCartSummary] = useState({
    totalItems: 0,
    totalPrice: 0
  }) // Stores the cart summary

  // Function to update the cart state from the API (for viewing the cart)
  const viewCartById = async userId => {
    try {
      const { data } = await viewCart(userId)
      setCartItems(data.cart.items) // Update the cart items state with items from the API
    } catch (error) {
      console.error('Error fetching cart data:', error)
    }
  }

  // Adding item to the cart (without quantity)
  const handleAddToCart = async (userId, itemId) => {
    try {
      const updatedCart = await addToCart(userId, itemId)
      setCartItems(updatedCart.cart.items) // Update the cart items state after adding the item
    } catch (error) {
      console.error('Error adding item to cart:', error)
    }
  }

  // Removing item from the cart
  const handleRemoveFromCart = async (userId, itemId) => {
    try {
      const updatedCart = await removeFromCart(userId, itemId)
      setCartItems(updatedCart.cart.items) // Update the cart items state after removing the item
      return updatedCart // Return updated cart (this can be useful for the frontend)
    } catch (error) {
      console.error('Error removing item from cart:', error)
      throw error
    }
  }

  // Clear the entire cart
  const handleClearCart = async userId => {
    try {
      const clearedCart = await clearCart(userId)
      setCartItems(clearedCart.cart.items) // Update the cart items state after clearing the cart
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  // Checkout (clear cart and proceed with the order)
  const handleCheckout = async userId => {
    try {
      const result = await checkout(userId)
      setCartItems([]) // Clear the cart items in the state after checkout
      alert('Checkout successful!') // Optionally, you can show a success message
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }

  // Get the cart summary (total items and total price)
  const getCartSummaryData = async userId => {
    try {
      const summary = await getCartSummary(userId)
      setCartSummary(summary) // Update the cart summary state with total items and price
    } catch (error) {
      console.error('Error getting cart summary:', error)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartSummary,
        handleAddToCart,
        handleRemoveFromCart,
        viewCartById,
        handleClearCart,
        handleCheckout,
        getCartSummaryData
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
