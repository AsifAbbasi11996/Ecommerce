import React, { useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import { Table, Button, Modal, Form, Input, Upload, message } from 'antd'
import {
  getSliders,
  deleteSlider,
  addSlider,
  updateSlider,
  getSliderById
} from '../api/sliderApi'
import { formatImageUrl } from '../utils/formatImageUrl'
import { UploadOutlined } from '@ant-design/icons'

const Slider = () => {
  const [sliders, setSliders] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingSlider, setEditingSlider] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // States to store the selected files for preview
  const [imagePreview, setImagePreview] = useState(null)
  const [smallImagePreview, setSmallImagePreview] = useState(null)
  const [mobileImagePreview, setMobileImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [smallImageFile, setSmallImageFile] = useState(null)
  const [mobileImageFile, setMobileImageFile] = useState(null)

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

  const showCreateModal = () => {
    setIsModalVisible(true)
    setIsCreating(true)
    setEditingSlider(null)

    setTimeout(() => {
      const form = document.querySelector('form')
      if (form) {
        const fileInputs = form.querySelectorAll('input[type="file"]')
        fileInputs.forEach(input => {
          input.value = ''
        })
      }
    }, 0)
  }

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

  const handleSubmit = async values => {
    setLoading(true)
    const formData = new FormData()

    // Append normal fields like link, smalltext, and bigtext
    formData.append('link', values.link)
    formData.append('smalltext', values.smalltext)
    formData.append('bigtext', values.bigtext)

    // Append the image files
    if (imageFile) formData.append('image', imageFile)
    if (smallImageFile) formData.append('smallimage', smallImageFile)
    if (mobileImageFile) formData.append('mobileImage', mobileImageFile)

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

  const handleDelete = async id => {
    try {
      await deleteSlider(id)
      setSliders(sliders.filter(slider => slider._id !== id))
    } catch (error) {
      console.error('Error deleting slider:', error)
    }
  }

  const handleImageChange = (file, field) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (field === 'image') {
        setImagePreview(reader.result)
        setImageFile(file) // Set the file object for submission
      } else if (field === 'smallimage') {
        setSmallImagePreview(reader.result)
        setSmallImageFile(file) // Set the file object for submission
      } else if (field === 'mobileImage') {
        setMobileImagePreview(reader.result)
        setMobileImageFile(file) // Set the file object for submission
      }
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

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
      title: 'Link',
      dataIndex: 'link',
      key:'link'
    },
    {
      title: 'Mobile Image',
      dataIndex: 'mobileImage',
      key: 'mobileImage',
      render: text => (
        <img src={formatImageUrl(text)} alt='slider' style={{ width: 100 }} />
      )
    },
    {
      title: 'Small Image',
      dataIndex: 'smallimage',
      key: 'smallimage',
      render: text =>
        text ? (
          <img src={formatImageUrl(text)} alt='slider' style={{ width: 100 }} />
        ) : null
    },
    {
      title: 'Big Text',
      dataIndex: 'bigtext',
      key: 'bigtext'
    },
    {
      title: 'Small Text',
      dataIndex: 'smalltext',
      key: 'smalltext'
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

          {/* Image Upload Fields with Preview */}
          <Form.Item label='Image' name='image'>
            {imagePreview && (
              <div>
                <img
                  src={imagePreview}
                  alt='Desktop Image Preview'
                  style={{ width: 100 }}
                />
              </div>
            )}
            <Upload
              accept='image/*'
              beforeUpload={file => {
                handleImageChange(file, 'image')
                return false // Prevent auto-upload
              }}
              listType='picture'
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Desktop Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item label='Small Image' name='smallimage'>
            {smallImagePreview && (
              <div>
                <img
                  src={smallImagePreview}
                  alt='Small Image Preview'
                  style={{ width: 100 }}
                />
              </div>
            )}
            <Upload
              accept='image/*'
              beforeUpload={file => {
                handleImageChange(file, 'smallimage')
                return false
              }}
              listType='picture'
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Small Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item label='Mobile Image' name='mobileImage'>
            {mobileImagePreview && (
              <div>
                <img
                  src={mobileImagePreview}
                  alt='Mobile Image Preview'
                  style={{ width: 100 }}
                />
              </div>
            )}
            <Upload
              accept='image/*'
              beforeUpload={file => {
                handleImageChange(file, 'mobileImage')
                return false
              }}
              listType='picture'
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Mobile Image</Button>
            </Upload>
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
