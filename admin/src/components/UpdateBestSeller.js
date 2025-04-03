import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { getItemById, updateBestsellerStatus } from '../api/itemApi';

const UpdateBestSeller = ({ itemId }) => {
  const [isBestseller, setIsBestseller] = useState(false);

  // Fetch the initial status of the item on component mount
  useEffect(() => {
    const fetchItemStatus = async () => {
      try {
        // Fetch the item by ID to get the initial bestseller status
        const item = await getItemById(itemId);
        setIsBestseller(item.bestseller); // Set initial status
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItemStatus();
  }, [itemId]);

  // Function to toggle the bestseller status
  const toggleBestsellerStatus = async () => {
    const newBestsellerStatus = !isBestseller; // Toggle the current status
    setIsBestseller(newBestsellerStatus); // Update local state

    try {
      // Call the backend to update the bestseller status on the server
      const response = await updateBestsellerStatus(
        itemId,
        newBestsellerStatus ? 'true' : 'false' // Pass the status as a string ('true' or 'false')
      );
      console.log('Updated Bestseller Status:', response.message);
    } catch (error) {
      console.error('Error updating bestseller status:', error);
      setIsBestseller(isBestseller); // Revert to previous state if error occurs
    }
  };

  return (
    <div>
      <h2>Update Bestseller Status</h2>
      <p>Status: {isBestseller ? 'This is a Bestseller' : 'This is NOT a Bestseller'}</p>
      
      <Button
        variant="contained"
        color={isBestseller ? 'error' : 'primary'} // Change button color based on status
        onClick={toggleBestsellerStatus}
      >
        {isBestseller ? 'Remove from Bestseller' : 'Mark as Bestseller'}
      </Button>
    </div>
  );
};

export default UpdateBestSeller;
