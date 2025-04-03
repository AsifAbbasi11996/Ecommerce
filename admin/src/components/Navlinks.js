import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input } from 'antd'
import {
  getNavItems,
  updateNavItem,
  deleteNavItem,
  getNavItemById,
  createNavItem // Import the createNavItem function
} from '../api/navbarApi' // Adjust the import path accordingly
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'
import '../assets/styles/Ecommerce.css'

const Navlinks = () => {
  const [navItems, setNavItems] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isCreating, setIsCreating] = useState(false) // To distinguish between create and update mode
  const [editingNavItem, setEditingNavItem] = useState(null) // Store the nav item being edited
  const [loading, setLoading] = useState(false)

  // Fetch nav items on component mount
  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const items = await getNavItems()
        setNavItems(items)
      } catch (error) {
        console.error('Error fetching nav items:', error)
      }
    }

    fetchNavItems()
  }, [])

  // Show modal for editing a specific nav item
  const showEditModal = async id => {
    setLoading(true) // Set loading state while fetching data
    try {
      const navItem = await getNavItemById(id) // Fetch nav item by ID
      setEditingNavItem(navItem) // Set the fetched nav item to state
      setIsModalVisible(true) // Show the modal
      setIsCreating(false) // Set the state to update mode
    } catch (error) {
      console.error('Error fetching nav item by ID:', error)
    } finally {
      setLoading(false) // Reset loading state
    }
  }

  // Show modal for creating a new nav item
  const showCreateModal = () => {
    setIsModalVisible(true)
    setIsCreating(true) // Set the state to create mode
    setEditingNavItem(null) // Reset the editingNavItem to null for a new entry
  }

  // Handle form submission for updating or creating nav item
  const handleSubmit = async values => {
    setLoading(true)
    try {
      if (isCreating) {
        // If creating a new nav item
        const newItem = await createNavItem(values) // Create the nav item
        setNavItems([...navItems, newItem]) // Add the new item to the state
      } else {
        // If updating an existing nav item
        const updatedItem = await updateNavItem(editingNavItem._id, values) // Update the nav item
        setNavItems(
          navItems.map(item =>
            item._id === updatedItem._id ? updatedItem : item
          )
        ) // Update the table data with the new item
      }
      setIsModalVisible(false) // Close the modal after the action
    } catch (error) {
      console.error('Error updating or creating nav item:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle delete action
  const handleDelete = async id => {
    try {
      await deleteNavItem(id) // Delete the nav item
      setNavItems(navItems.filter(item => item._id !== id)) // Remove the item from the table
    } catch (error) {
      console.error('Error deleting nav item:', error)
    }
  }

  // Define columns for the Ant Design table
  const columns = [
    {
      title: 'Nav Name',
      dataIndex: 'nav',
      key: 'nav'
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
          <Button
            type='primary'
            onClick={() => showEditModal(record._id)} // Pass the nav item ID to the showEditModal function
            style={{ marginRight: 10 }}
          >
            Edit
          </Button>
          <Button type='danger' onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      )
    }
  ]

  return (
    <div className='navlink_container'>
      <div className='head'>
        <p>Ecommerce</p>
        <MdKeyboardDoubleArrowRight />
        <p>Navbar</p>
      </div>

      <h2>Navbar Items</h2>

      <Button
        type='primary'
        onClick={showCreateModal}
        style={{ marginBottom: 16 }}
      >
        Add New Nav Item
      </Button>

      <Table
        dataSource={navItems}
        columns={columns}
        rowKey='_id'
        pagination={false} // Disable pagination for simplicity
      />

      {/* Modal for editing or creating nav items */}
      <Modal
        title={isCreating ? 'Create Nav Item' : 'Edit Nav Item'} // Dynamic title based on create or update
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        confirmLoading={loading}
      >
        <Form
          initialValues={editingNavItem} // Populate form with the data of the selected navItem (if editing)
          onFinish={handleSubmit}
        >
          <Form.Item
            label='Nav Name'
            name='nav'
            rules={[{ required: true, message: 'Please input the nav name!' }]}
          >
            <Input />
          </Form.Item>
          <p className='slash'>Please put "/" first while adding the link</p>
          <Form.Item
            label='Link'
            name='link'
            rules={[{ required: true, message: 'Please input the link!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
              {isCreating ? 'Create' : 'Update'} {/* Dynamic button text */}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Navlinks
