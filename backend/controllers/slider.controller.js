import Slider from '../models/slider.models.js'
import fs from 'fs'
import path from 'path'

// Fetch all sliders
const getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ createdAt: -1 })
    res.status(200).json(sliders)
  } catch (error) {
    console.error('Error fetching sliders:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

// Fetch a single slider by ID
const getSliderById = async (req, res) => {
  const { id } = req.params

  try {
    const slider = await Slider.findById(id)
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' })
    }
    res.status(200).json(slider)
  } catch (error) {
    console.error('Error fetching slider:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete a slider by ID
const deleteSliderById = async (req, res) => {
  const { id } = req.params

  try {
    const slider = await Slider.findByIdAndDelete(id)
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' })
    }

    // Optionally, delete the image file associated with the slider
    if (slider.image) {
      const imagePath = path.join(__dirname, '..', slider.image)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }

    res.status(200).json({ message: 'Slider deleted successfully' })
  } catch (error) {
    console.error('Error deleting slider:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}

// Add a new slider with image upload handling
const addSlider = async (req, res) => {
  const { image, smallimage } = req.files ? req.files : {} // Handle multiple file fields
  const { link, smalltext, bigtext } = req.body

  // Ensure image exists
  if (!image) {
    return res.status(400).json({ message: 'Please upload an image' })
  }

  const newSlider = new Slider({
    image: image[0].path, // Multer returns an array of files in `req.files`
    smallimage: smallimage ? smallimage[0].path : null,
    link,
    smalltext,
    bigtext
  })

  try {
    const savedSlider = await newSlider.save()
    res.status(201).json(savedSlider)
  } catch (error) {
    console.error('Error adding slider:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Update a slider by ID (only image and text)
const updateSliderById = async (req, res) => {
  const { id } = req.params
  const { image, smallimage } = req.files ? req.files : {} // Handle multiple file fields
  const { link, smalltext, bigtext } = req.body

  try {
    const slider = await Slider.findById(id)
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' })
    }

    // Handle image
    if (image) {
      // Delete the old image if necessary
      if (slider.image) {
        const oldImagePath = path.join(__dirname, '..', slider.image)
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }
      slider.image = image[0].path
    }

    // Handle smallimage
    if (smallimage) {
      // Delete the old smallimage if necessary
      if (slider.smallimage) {
        const oldSmallImagePath = path.join(__dirname, '..', slider.smallimage)
        if (fs.existsSync(oldSmallImagePath)) {
          fs.unlinkSync(oldSmallImagePath)
        }
      }
      slider.smallimage = smallimage[0].path
    }

    if (link) {
      slider.link = link
    }

    if (smalltext) {
      slider.smalltext = smalltext // Update the smalltext if provided
    }

    if (bigtext) {
      slider.bigtext = bigtext // Update the bigtext if provided
    }

    const updatedSlider = await slider.save()
    res.status(200).json(updatedSlider)
  } catch (error) {
    console.error('Error updating slider:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Delete a single image from a slider by ID
const deleteSliderImage = async (req, res) => {
  const { id } = req.params

  try {
    const slider = await Slider.findById(id)
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' })
    }

    const imagePath = slider.image
      ? path.join(__dirname, '..', slider.image)
      : null

    const smallimagePath = slider.smallimage
      ? path.join(__dirname, '..', slider.smallimage)
      : null
    if (
      imagePath ||
      (smallimagePath && fs.existsSync(imagePath)) ||
      fs.existsSync(smallimagePath)
    ) {
      fs.unlinkSync(imagePath)
      slider.image = null // Set image to null in the database
      await slider.save()
      res.status(200).json({ message: 'Image deleted successfully' })
    } else {
      res.status(404).json({ message: 'Image not found on server' })
    }
  } catch (error) {
    console.error('Error deleting image:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export {
  getAllSliders,
  getSliderById,
  deleteSliderById,
  addSlider,
  updateSliderById,
  deleteSliderImage
}
