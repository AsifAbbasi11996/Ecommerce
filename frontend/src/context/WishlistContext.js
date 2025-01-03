import React, { createContext, useState, useContext } from 'react'
import {
  addToWishlist,
  removeFromWishlist,
  viewWishlist,
  clearWishlist,
  checkout,
  getWishlistSummary
} from '../api/wishlistApi'

const WishlistContext = createContext()

export const useWishlist = () => {
  return useContext(WishlistContext)
}

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]) // Stores the Wishlist items
  const [wishlistSummary, setWishlistSummary] = useState({
    totalItems: 0,
    totalPrice: 0
  }) // Stores the Wishlist summary

  // Function to update the Wishlist state from the API (for viewing the Wishlist)
  const viewWishlistById = async userId => {
    try {
      const { data } = await viewWishlist(userId)
      setWishlistItems(data.wishlist.items) // Update the Wishlist items state with items from the API
    } catch (error) {
      console.error('Error fetching Wishlist data:', error)
    }
  }

  // Adding item to the Wishlist (without quantity)
  const handleAddToWishlist = async (userId, itemId) => {
    try {
      const updatedWishlist = await addToWishlist(userId, itemId)
      setWishlistItems(updatedWishlist.wishlist.items) // Update the Wishlist items state after adding the item
    } catch (error) {
      console.error('Error adding item to Wishlist:', error)
    }
  }

  // Removing item from the Wishlist
  const handleRemoveFromWishlist = async (userId, itemId) => {
    try {
      const updatedWishlist = await removeFromWishlist(userId, itemId)
      setWishlistItems(updatedWishlist.wishlist.items) // Update the Wishlist items state after removing the item
      return updatedWishlist // Return updated Wishlist (this can be useful for the frontend)
    } catch (error) {
      console.error('Error removing item from Wishlist:', error)
      throw error
    }
  }

  // Clear the entire Wishlist
  const handleClearWishlist = async userId => {
    try {
      const clearedWishlist = await clearWishlist(userId)
      setWishlistItems(clearedWishlist.wishlist.items) // Update the Wishlist items state after clearing the Wishlist
    } catch (error) {
      console.error('Error clearing Wishlist:', error)
    }
  }

  // Checkout (clear Wishlist and proceed with the order)
  const handleCheckout = async userId => {
    try {
      const result = await checkout(userId)
      setWishlistItems([]) // Clear the Wishlist items in the state after checkout
      alert('Checkout successful!') // Optionally, you can show a success message
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }

  // Get the Wishlist summary (total items and total price)
  const getWishlistSummaryData = async userId => {
    try {
      const summary = await getWishlistSummary(userId)
      setWishlistSummary(summary) // Update the Wishlist summary state with total items and price
    } catch (error) {
      console.error('Error getting Wishlist summary:', error)
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistSummary,
        handleAddToWishlist,
        handleRemoveFromWishlist,
        viewWishlistById,
        handleClearWishlist,
        handleCheckout,
        getWishlistSummaryData
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
