import React, { useState } from 'react'
import axios from 'axios'

const AddProductForm = () => {
  const [productname, setProductname] = useState('')
  const [brand, setBrand] = useState('')
  const [gender, setGender] = useState('')
  const [category, setCategory] = useState('')
  const [rating, setRating] = useState('')
  const [mrp, setMrp] = useState('')
  const [sp, setSp] = useState('')
  const [productdetail, setProductdetail] = useState('')
  const [sizefit, setSizefit] = useState('')
  const [materialcare, setMaterialcare] = useState('')
  const [specification, setSpecification] = useState([{ title: '', data: '' }])
  const [discountStart, setDiscountStart] = useState('')
  const [discountEnd, setDiscountEnd] = useState('')
  const [colors, setColors] = useState([
    {
      col: '',
      images: [], // Store images for each color here
      sizes: [{ size: '', count: '' }]
    }
  ])

  // Handle changes for color field
  const handleColorChange = (index, field, value) => {
    const updatedColors = [...colors]
    updatedColors[index][field] = value
    setColors(updatedColors)
  }

  // Handle changes for size and count fields
  const handleSizeChange = (colorIndex, sizeIndex, field, value) => {
    const updatedColors = [...colors]
    updatedColors[colorIndex].sizes[sizeIndex][field] = value
    setColors(updatedColors)
  }

  // Handle adding new colors
  const handleAddColor = () => {
    setColors([
      ...colors,
      {
        col: '',
        images: [],
        sizes: [{ size: '', count: '' }]
      }
    ])
  }

  // Handle adding new size
  const handleAddSize = colorIndex => {
    const updatedColors = [...colors]
    updatedColors[colorIndex].sizes.push({ size: '', count: '' })
    setColors(updatedColors)
  }

  // Handle adding a new specification field
  const handleAddSpecification = () => {
    setSpecification([...specification, { title: '', data: '' }])
  }

  // Handle removing a size
  const handleRemoveSize = (colorIndex, sizeIndex) => {
    const updatedColors = [...colors]
    updatedColors[colorIndex].sizes.splice(sizeIndex, 1)
    setColors(updatedColors)
  }

  // Handle adding images for each color
  const handleAddImages = (colorIndex, files) => {
    const updatedColors = [...colors]
    updatedColors[colorIndex].images = [
      ...updatedColors[colorIndex].images,
      ...files
    ]
    setColors(updatedColors)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formData = new FormData()

    // Append basic product details
    formData.append('productname', productname)
    formData.append('brand', brand)
    formData.append('gender', gender)
    formData.append('category', category)
    formData.append('rating', rating)
    formData.append('mrp', mrp)
    formData.append('sp', sp)
    formData.append('productdetail', productdetail)
    formData.append('sizefit', sizefit)
    formData.append('materialcare', materialcare)

    // Add specification fields
    specification.forEach((spec, index) => {
      formData.append(`specification[${index}][title]`, spec.title)
      formData.append(`specification[${index}][data]`, spec.data)
    })

    // Add discount details
    formData.append('discount[startDate]', discountStart)
    formData.append('discount[endDate]', discountEnd)

    // Handle color data, including images and sizes
    colors.forEach((color, colorIndex) => {
      formData.append(`colors[${colorIndex}][col]`, color.col)

      // Add multiple images for each color
      color.images.forEach((image, imageIndex) => {
        formData.append(`colors[${colorIndex}][images]`, image)
      })

      // Add sizes for each color
      color.sizes.forEach((size, sizeIndex) => {
        formData.append(
          `colors[${colorIndex}][sizes][${sizeIndex}][size]`,
          size.size
        )
        formData.append(
          `colors[${colorIndex}][sizes][${sizeIndex}][count]`,
          size.count
        )
      })
    })

    try {
      const response = await axios.post(
        'http://localhost:5000/product/add',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      alert('Product added successfully!')
      console.log(response.data)
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Error adding product')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type='text'
          value={productname}
          onChange={e => setProductname(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Brand:</label>
        <input
          type='text'
          value={brand}
          onChange={e => setBrand(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Gender:</label>
        <input
          type='text'
          value={gender}
          onChange={e => setGender(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type='text'
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          type='number'
          value={rating}
          onChange={e => setRating(e.target.value)}
          required
        />
      </div>
      <div>
        <label>MRP:</label>
        <input
          type='number'
          value={mrp}
          onChange={e => setMrp(e.target.value)}
          required
        />
      </div>
      <div>
        <label>SP:</label>
        <input
          type='number'
          value={sp}
          onChange={e => setSp(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Product Details:</label>
        <textarea
          value={productdetail}
          onChange={e => setProductdetail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Size Fit:</label>
        <input
          type='text'
          value={sizefit}
          onChange={e => setSizefit(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Material Care:</label>
        <input
          type='text'
          value={materialcare}
          onChange={e => setMaterialcare(e.target.value)}
        />
      </div>
      <div>
        <label>Discount Start Date:</label>
        <input
          type='datetime-local'
          value={discountStart}
          onChange={e => setDiscountStart(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Discount End Date:</label>
        <input
          type='datetime-local'
          value={discountEnd}
          onChange={e => setDiscountEnd(e.target.value)}
          required
        />
      </div>

      {specification.map((spec, index) => (
        <div key={index}>
          <label>Specification {index + 1} Title:</label>
          <input
            type='text'
            value={spec.title}
            onChange={e =>
              setSpecification(
                specification.map((s, i) =>
                  i === index ? { ...s, title: e.target.value } : s
                )
              )
            }
          />
          <label>Specification {index + 1} Data:</label>
          <input
            type='text'
            value={spec.data}
            onChange={e =>
              setSpecification(
                specification.map((s, i) =>
                  i === index ? { ...s, data: e.target.value } : s
                )
              )
            }
          />
        </div>
      ))}
      <button type='button' onClick={handleAddSpecification}>
        Add Specification
      </button>

      {colors.map((color, colorIndex) => (
        <div key={colorIndex}>
          <label>Color {colorIndex + 1}:</label>
          <input
            type='text'
            value={color.col}
            onChange={e => handleColorChange(colorIndex, 'col', e.target.value)}
          />
          <label>Images for {color.col}:</label>
          <input
            type='file'
            multiple
            onChange={e =>
              handleAddImages(colorIndex, Array.from(e.target.files))
            }
          />
          <div>
            {color.images.length > 0 && (
              <ul>
                {color.images.map((image, imageIndex) => (
                  <li key={imageIndex}>{image.name}</li>
                ))}
              </ul>
            )}
          </div>
          {color.sizes.map((size, sizeIndex) => (
            <div key={sizeIndex}>
              <label>Size:</label>
              <input
                type='text'
                value={size.size}
                onChange={e =>
                  handleSizeChange(
                    colorIndex,
                    sizeIndex,
                    'size',
                    e.target.value
                  )
                }
              />
              <label>Count:</label>
              <input
                type='number'
                value={size.count}
                onChange={e =>
                  handleSizeChange(
                    colorIndex,
                    sizeIndex,
                    'count',
                    e.target.value
                  )
                }
              />
              <button
                type='button'
                onClick={() => handleRemoveSize(colorIndex, sizeIndex)}
              >
                Remove Size
              </button>
            </div>
          ))}
          <button type='button' onClick={() => handleAddSize(colorIndex)}>
            Add Size
          </button>
        </div>
      ))}
      <button type='button' onClick={handleAddColor}>
        Add Color
      </button>

      <button type='submit'>Add Product</button>
    </form>
  )
}

export default AddProductForm
