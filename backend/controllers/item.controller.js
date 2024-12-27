import Item from '../models/item.models.js'

// Controller to add a new item
const addItem = async (req, res) => {
  try {
    // Extracting the fields from the request body
    const {
      itemName,
      brand,
      category,
      color,
      rating,
      mrp,
      sp,
      itemdetail,
      stock,
      discount
    } = req.body

    // Validate that MRP and SP are provided and MRP > SP
    if (!mrp || !sp || mrp <= sp) {
      return res.status(400).json({
        error: 'Invalid MRP and SP values. MRP must be greater than SP.'
      })
    }

    // Calculate discount percentage
    const discountPercentage = Math.round(((mrp - sp) / mrp) * 100)

    // Extracting the image paths uploaded by multer
    const images = req.files.map(file => file.path)

    // Validate that at least one image is provided
    if (!images || images.length === 0) {
      return res.status(400).json({ error: 'At least one image is required.' })
    }

    // Handle color field: convert it to an array if provided
    const colorArray = color ? color.split(',') : []

    // Creating the item
    const newItem = new Item({
      itemName,
      brand,
      category,
      images,
      color: colorArray,
      rating,
      mrp,
      sp,
      itemdetail: Array.isArray(itemdetail) ? itemdetail : [itemdetail], // Ensure it's an array
      stock,
      discount: {
        ...discount,
        percentage: discountPercentage
      },
      status: 'available'
    })

    // Save the item to the database
    const savedItem = await newItem.save()

    res.status(201).json({
      message: 'Item added successfully',
      item: savedItem
    })
  } catch (error) {
    console.error('Error adding item:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
    res.status(200).json(items)
  } catch (error) {
    console.error('Error fetching items:', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Delete an item by ID
const deleteItemById = async (req, res) => {
  try {
    const { id } = req.params
    const deletedItem = await Item.findByIdAndDelete(id)

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' })
    }

    res.status(200).json({ message: 'Item deleted successfully' })
  } catch (error) {
    console.error('Error deleting item:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Get an item by ID
const getItemById = async (req, res) => {
  try {
    const { id } = req.params
    const item = await Item.findById(id)

    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    res.status(200).json(item)
  } catch (error) {
    console.error('Error fetching item:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Update an item by ID
const updateItemById = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    // Ensure MRP > SP if both are being updated
    if (updates.mrp && updates.sp && updates.mrp <= updates.sp) {
      return res.status(400).json({
        error: 'Invalid MRP and SP values. MRP must be greater than SP.'
      })
    }

    // Update discount percentage if MRP and SP are updated
    if (updates.mrp && updates.sp) {
      updates.discount = {
        ...updates.discount,
        percentage: Math.round(((updates.mrp - updates.sp) / updates.mrp) * 100)
      }
    }

    // Handle color update if provided
    if (updates.color) {
      updates.color = updates.color.split(',')
    }

    const updatedItem = await Item.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    })

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' })
    }

    res
      .status(200)
      .json({ message: 'Item updated successfully', item: updatedItem })
  } catch (error) {
    console.error('Error updating item:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Delete a single image from the images array
const deleteImageFromItem = async (req, res) => {
  try {
    const { id } = req.params
    const { imagePath } = req.body

    const item = await Item.findById(id)

    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    const updatedImages = item.images.filter(image => image !== imagePath)

    if (updatedImages.length === item.images.length) {
      return res.status(400).json({ message: 'Image not found in item' })
    }

    item.images = updatedImages
    await item.save()

    res.status(200).json({ message: 'Image removed successfully', item })
  } catch (error) {
    console.error('Error removing image:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Add more images to the images array
const addImagesToItem = async (req, res) => {
  try {
    const { id } = req.params
    const newImages = req.files.map(file => file.path) // Paths of newly uploaded images

    const item = await Item.findById(id)

    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    // Add new images to the existing images array
    item.images = [...item.images, ...newImages]
    await item.save()

    res.status(200).json({ message: 'Images added successfully', item })
  } catch (error) {
    console.error('Error adding images:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Controller to get related items based on category
const getRelatedItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params // Extract category from the URL parameter

    // Find all items in the same category (excluding the current item)
    const relatedItems = await Item.find({ category })
      .limit(4) // Limit the number of related products
      .sort({ rating: -1 }) // You can sort by rating or other criteria (e.g., price, newness)

    if (!relatedItems.length) {
      return res.status(404).json({ message: 'No related products found' })
    }

    res.status(200).json(relatedItems)
  } catch (error) {
    console.error('Error fetching related items:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export {
  addItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
  deleteImageFromItem,
  addImagesToItem,
  getRelatedItemsByCategory
}
