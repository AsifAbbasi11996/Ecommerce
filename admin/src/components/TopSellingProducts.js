import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import '../assets/styles/TopSellingProducts.css'
import { getAllItems } from '../api/itemApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { truncateText } from '../utils/formatText'
import { formatPrice } from '../utils/formatPrice'

const TopSellingProducts = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Fetching all items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getAllItems()
        setItems(data)
        setLoading(false)

        // Extract categories and brands dynamically
        const extractedCategories = [
          ...new Set(data.map(item => item.category))
        ]
        const extractedBrands = [...new Set(data.map(item => item.brand))]

        setCategories(extractedCategories)
        setBrands(extractedBrands)
      } catch (error) {
        setLoading(false)
        toast.error('Failed to load items.')
      }
    }

    fetchItems()
  }, [])

  // Filter items based on search query, category, and brand
  const filteredItems = items.filter(item => {
    const searchMatches =
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const categoryMatches = categoryFilter
      ? item.category === categoryFilter
      : true
    const brandMatches = brandFilter ? item.brand === brandFilter : true
    return searchMatches && categoryMatches && brandMatches
  })

  // Sort filtered items by orderCount in descending order
  const sortedItems = filteredItems.sort((a, b) => b.orderCount - a.orderCount)

  // Calculate the paginated items
  const totalItems = sortedItems.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  // Handle page change
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber)
  }

  // Calculate the page range to display (e.g., 5 pages at a time)
  const rangeSize = 5
  const startPage = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1
  const endPage = Math.min(startPage + rangeSize - 1, totalPages)

  // Handle the previous and next page navigation within page range
  const handleNextPageRange = () => {
    if (endPage < totalPages) {
      setCurrentPage(endPage + 1)
    }
  }

  const handlePrevPageRange = () => {
    if (startPage > 1) {
      setCurrentPage(startPage - rangeSize)
    }
  }

  return (
    <div className='top_selling_products_container'>
      <h2>Top Selling Items</h2>

      <div className='filters'>
        <select
          className='rows'
          value={rowsPerPage}
          onChange={e => setRowsPerPage(Number(e.target.value))}
        >
          <option value={10}>10 orders</option>
          <option value={20}>20 orders</option>
          <option value={30}>30 orders</option>
        </select>
        <input
          type='text'
          placeholder='Search by Name, Category, or Brand'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='search-bar'
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className='filter-select'
        >
          <option value=''>All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={brandFilter}
          onChange={e => setBrandFilter(e.target.value)}
          className='filter-select'
        >
          <option value=''>All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <motion.table className='top-selling-table'>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Item Name</th>
            <th>Sales</th>
            <th>Order Count</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, index) => (
            <motion.tr
              key={item._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
              <td>{truncateText(item.itemName)}</td>
              <td>{formatPrice(item.sales)}</td>
              <td>{item.orderCount}</td>
              <td>{formatPrice(item.sp)}</td>
              <td>
                <span className={`status ${item.status}`}>{item.status}</span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      {/* Pagination Controls */}
      <div className='pagination'>
        <button onClick={handlePrevPageRange} disabled={startPage === 1}>
          Prev Range
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            className={currentPage === startPage + index ? 'active' : ''}
          >
            {startPage + index}
          </button>
        ))}
        <button onClick={handleNextPageRange} disabled={endPage === totalPages}>
          Next Range
        </button>
      </div>

      <ToastContainer />
    </div>
  )
}

export default TopSellingProducts