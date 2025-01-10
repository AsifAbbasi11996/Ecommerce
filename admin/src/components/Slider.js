import React, { useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { Table, Button, Modal, Form, Input } from 'antd'
import {
  getSliders,
  deleteSlider,
  addSlider,
  updateSlider,
  getSliderById
} from '../api/sliderApi'
import '../assets/styles/Ecommerce.css'
import { formatImageUrl } from '../utils/formatImageUrl'

const Slider = () => {
  const [sliders, setSliders] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingSlider, setEditingSlider] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false) // Check if you're creating or updating

  // Fetch sliders on component mount
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const sliders = await getSliders()
        setSliders(sliders)
      } catch (error) {
        console.error('Error fetching sliders:', error)
      }
    }

    fetchSliders()
  }, [])

  // Show modal for adding a new slider
  const showCreateModal = () => {
    setIsModalVisible(true)
    setIsCreating(true)
    setEditingSlider(null) // Clear any previous editing data
  }

  // Show modal for editing an existing slider
  const showEditModal = async id => {
    setLoading(true)
    try {
      const slider = await getSliderById(id)
      setEditingSlider(slider)
      setIsModalVisible(true)
      setIsCreating(false)
    } catch (error) {
      console.error('Error fetching slider for editing:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle form submission for creating or updating a slider
  const handleSubmit = async values => {
    setLoading(true)
    const formData = new FormData()

    // Append the form fields to FormData
    formData.append('link', values.link)
    formData.append('smalltext', values.smalltext)
    formData.append('bigtext', values.bigtext)

    // Append the files if available
    if (values.image) formData.append('image', values.image[0]) // File field
    if (values.smallimage) formData.append('smallimage', values.smallimage[0])
    if (values.mobileImage)
      formData.append('mobileImage', values.mobileImage[0])

    try {
      if (isCreating) {
        // Create new slider
        const newSlider = await addSlider(formData)
        setSliders([...sliders, newSlider])
      } else {
        // Update existing slider
        const updatedSlider = await updateSlider(editingSlider._id, formData)
        setSliders(
          sliders.map(slider =>
            slider._id === updatedSlider._id ? updatedSlider : slider
          )
        )
      }
      setIsModalVisible(false) // Close the modal after submission
    } catch (error) {
      console.error('Error submitting slider:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle slider deletion
  const handleDelete = async id => {
    try {
      await deleteSlider(id)
      setSliders(sliders.filter(slider => slider._id !== id)) // Remove from state
    } catch (error) {
      console.error('Error deleting slider:', error)
    }
  }

  // Define columns for the table
  const columns = [
    {
      title: 'Desktop Image',
      dataIndex: 'image',
      key: 'image',
      render: text => (
        <img src={formatImageUrl(text)} alt='slider' style={{ width: 100 }} />
      )
    },
    {
      title: 'Mobile Image',
      dataIndex: 'mobileImage',
      key: 'image',
      render: text => (
        <img src={formatImageUrl(text)} alt='slider' style={{ width: 100 }} />
      )
    },
    {
      title: 'Small Image',
      dataIndex: 'smallimage',
      key: 'image',
      render: text =>
        text ? (
          <img src={formatImageUrl(text)} alt='slider' style={{ width: 100 }} />
        ) : null
    },
    {
      title: 'Big Text',
      dataIndex: 'bigtext',
      key: 'text'
    },
    {
      title: 'Small Text',
      dataIndex: 'smalltext',
      key: 'text'
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button type='primary' onClick={() => showEditModal(record._id)}>
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
    <div className='slider_container'>
      <div className='head'>
        <p>Ecommerce</p>
        <MdKeyboardDoubleArrowRight />
        <p>Slider</p>
      </div>

      <h2>Slider</h2>
      <Button
        type='primary'
        onClick={showCreateModal}
        style={{ marginBottom: 16 }}
      >
        Add New Slider
      </Button>

      <Table
        dataSource={sliders}
        columns={columns}
        rowKey='_id'
        pagination={false}
      />

      <Modal
        title={isCreating ? 'Add Slider' : 'Edit Slider'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        confirmLoading={loading}
      >
        <Form
          initialValues={editingSlider}
          onFinish={handleSubmit}
          encType='multipart/form-data'
        >
          <Form.Item
            label='Link'
            name='link'
            rules={[{ required: true, message: 'Please input the link!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Small Text' name='smalltext'>
            <Input />
          </Form.Item>
          <Form.Item label='Big Text' name='bigtext'>
            <Input />
          </Form.Item>

          <Form.Item label='Image' name='image'>
            {/* Show the existing image as a preview, if available */}
            {editingSlider && editingSlider.image && (
              <div>
                <img
                  src={formatImageUrl(editingSlider.image)}
                  alt='Current Desktop Image'
                  style={{ width: 100 }}
                />
              </div>
            )}
            <input type='file' accept='image/*' />
          </Form.Item>

          <Form.Item label='Small Image' name='smallimage'>
            {/* Show the existing small image as a preview, if available */}
            {editingSlider && editingSlider.smallimage && (
              <div>
                <img
                  src={formatImageUrl(editingSlider.smallimage)}
                  alt='Current Small Image'
                  style={{ width: 100 }}
                />
              </div>
            )}
            <input type='file' accept='image/*' />
          </Form.Item>

          <Form.Item label='Mobile Image' name='mobileImage'>
            {/* Show the existing mobile image as a preview, if available */}
            {editingSlider && editingSlider.mobileImage && (
              <div>
                <img
                  src={formatImageUrl(editingSlider.mobileImage)}
                  alt='Current Mobile Image'
                  style={{ width: 100 }}
                />
              </div>
            )}
            <input type='file' accept='image/*' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
              {isCreating ? 'Create' : 'Update'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Slider
