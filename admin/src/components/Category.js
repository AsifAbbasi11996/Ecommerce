import React, { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, Table, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import {
  addCategory,
  updateCategoryById,
  getAllCategories,
  getCategoryById,
  deleteCategoryById
} from '../api/categoryApi' // Make sure the import paths are correct
import { formatImageUrl } from '../utils/formatImageUrl'

const Category = () => {
  const [categories, setCategories] = useState([]) // State to hold fetched categories
  const [isModalVisible, setIsModalVisible] = useState(false) // To show/hide modal
  const [isCreating, setIsCreating] = useState(false) // To distinguish between create and update mode
  const [editingCategory, setEditingCategory] = useState(null) // Store the category being edited
  const [imagePreview, setImagePreview] = useState(null) // For image preview
  const [imageFile, setImageFile] = useState(null) // To hold the selected image file
  const [loading, setLoading] = useState(false) // Loading state for async actions

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching categories:', error)
        message.error('Failed to fetch categories')
      }
    }
    fetchCategories()
  }, [])

  // Show modal for editing a specific category
  const showEditModal = async id => {
    setLoading(true) // Set loading state while fetching data
    try {
      const category = await getCategoryById(id) // Fetch category by ID
      setEditingCategory(category) // Set the fetched category to state
      setImagePreview(
        category.image ? `/uploads/category/${category.image}` : null
      ) // Set the image preview
      setIsModalVisible(true) // Show the modal
      setIsCreating(false) // Set the state to update mode
    } catch (error) {
      console.error('Error fetching category by ID:', error)
      message.error('Failed to fetch category')
    } finally {
      setLoading(false) // Reset loading state
    }
  }

  // Show modal for creating a new category
  const showCreateModal = () => {
    setIsModalVisible(true)
    setIsCreating(true) // Set the state to create mode
    setEditingCategory(null) // Reset the editingCategory to null for a new entry
    setImagePreview(null) // Clear the image preview
    setImageFile(null) // Clear the selected image
  }

  // Handle form submission for updating or creating a category
  const handleSubmit = async values => {
    setLoading(true)
    const { categoryName, link } = values
    const formData = new FormData()

    formData.append('categoryName', categoryName)
    formData.append('link', link)
    if (imageFile) formData.append('image', imageFile)

    try {
      if (isCreating) {
        // If creating a new category
        const newCategory = await addCategory(categoryName, link, imageFile)
        setCategories([...categories, newCategory])
        message.success('Category added successfully')
      } else {
        // If updating an existing category
        await updateCategoryById(
          editingCategory._id,
          categoryName,
          link,
          imageFile
        )
        setCategories(
          categories.map(item =>
            item._id === editingCategory._id
              ? {
                  ...editingCategory,
                  categoryName,
                  link,
                  image: imageFile?.name || editingCategory.image
                }
              : item
          )
        )
        message.success('Category updated successfully')
      }
      setIsModalVisible(false) // Close the modal after the action
    } catch (error) {
      console.error('Error updating or creating category:', error)
      message.error('Failed to submit category')
    } finally {
      setLoading(false)
    }
  }

  // Handle category deletion
  const handleDelete = async id => {
    try {
      await deleteCategoryById(id) // Delete the category
      setCategories(categories.filter(item => item._id !== id)) // Remove the item from the table
      message.success('Category deleted successfully')
    } catch (error) {
      console.error('Error deleting category:', error)
      message.error('Failed to delete category')
    }
  }

  // Handle image change (preview the image)
  const handleImageChange = file => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result) // Set image preview
    }
    if (file) {
      reader.readAsDataURL(file)
      setImageFile(file) // Store file for submission
    }
    return false // Prevent auto-upload
  }

  // Define columns for the Ant Design table
  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName'
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link'
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: text =>
        text ? (
          <img
            src={formatImageUrl(text)}
            alt='category'
            style={{ width: 100 }}
          />
        ) : null
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type='primary'
            onClick={() => showEditModal(record._id)} // Pass the category ID to showEditModal
          >
            Edit
          </Button>
          <Button
            type='danger'
            onClick={() => handleDelete(record._id)}
            style={{ marginLeft: 10 }}
          >
            Delete
          </Button>
        </>
      )
    }
  ]

  return (
    <div className='category_container'>
      <div className='head'>
        <p>Ecommerce</p>
        <MdKeyboardDoubleArrowRight />
        <p>Category</p>
      </div>

      <h2>Category</h2>
      <Button
        type='primary'
        onClick={showCreateModal}
        style={{ marginBottom: 16 }}
      >
        Add New Category
      </Button>

      <Table
        dataSource={categories}
        columns={columns}
        rowKey='_id'
        pagination={false} // Disable pagination for simplicity
      />

      {/* Modal for editing or creating categories */}
      <Modal
        title={isCreating ? 'Create Category' : 'Edit Category'} // Dynamic title based on create or update
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        confirmLoading={loading}
      >
        <Form
          initialValues={editingCategory || {}} // Ensure form is always populated with correct data
          onFinish={handleSubmit}
        >
          <Form.Item
            label='Category Name'
            name='categoryName'
            rules={[
              { required: true, message: 'Please input the category name!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Link'
            name='link'
            rules={[{ required: true, message: 'Please input the link!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label='Category Image'>
            {imagePreview && (
              <img src={imagePreview} alt='Preview' style={{ width: 100 }} />
            )}
            <Upload
              accept='image/*'
              beforeUpload={handleImageChange}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
              {isCreating ? 'Create' : 'Update'} Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Category
