import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllItems } from '../api/itemApi.js' // Adjust the import based on your file structure
import { useTable } from 'react-table'
import { useTransition, animated } from 'react-spring'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../assets/styles/ViewProductsandUsers.css' // Add styles if needed
import {
  MdKeyboardDoubleArrowRight,
  MdEdit,
  MdDelete,
  MdRemoveRedEye
} from 'react-icons/md'
import { FaStar } from 'react-icons/fa'
import { formatImageUrl } from '../utils/formatImageUrl'
import { formatPrice } from '../utils/formatPrice'
import { truncateText } from '../utils/formatText.js'

const ViewItems = () => {
  const [items, setitems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  const [rowsPerPage, setRowsPerPage] = useState(2) // Default: 15 orders per page
  const [currentPage, setCurrentPage] = useState(1) // Default to page 1

  // Fetching all items
  useEffect(() => {
    const fetchitems = async () => {
      try {
        const data = await getAllItems()
        setitems(data)
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

    fetchitems()
  }, [])

  // Table columns configuration
  const columns = React.useMemo(
    () => [
      {
        Header: 'Sr No.',
        Cell: ({ row }) => row.index + 1
      },
      {
        Header: 'Item Image',
        accessor: 'images', // accessing images array for the image
        Cell: ({ value }) => {
          if (value && value[0]) {
            const imageUrl = formatImageUrl(value[0]) // use formatImageUrl if needed
            return <img src={imageUrl} alt='item' className='item-image' />
          }
          return <span>No Image</span>
        }
      },
      {
        Header: 'Item Name',
        accessor: 'itemName',
        Filter: ({ filterValue, setFilter }) => (
          <input
            value={filterValue || ''}
            onChange={e => setFilter(e.target.value || undefined)}
            placeholder='Search by name'
            className='filter-input'
          />
        ),
        Cell: ({ value }) => `${truncateText(value)}`
      },
      {
        Header: 'Brand',
        accessor: 'brand',
        Filter: ({ filterValue, setFilter }) => (
          <select
            value={filterValue || ''}
            onChange={e => setFilter(e.target.value || undefined)}
            className='filter-select'
          >
            <option value=''>All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        )
      },
      {
        Header: 'Category',
        accessor: 'category',
        Filter: ({ filterValue, setFilter }) => (
          <select
            value={filterValue || ''}
            onChange={e => setFilter(e.target.value || undefined)}
            className='filter-select'
          >
            <option value=''>All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )
      },
      {
        Header: 'MRP',
        accessor: 'mrp',
        Cell: ({ value }) => `${formatPrice(value)}` // Formatting price as currency
      },
      {
        Header: 'SP',
        accessor: 'sp',
        Cell: ({ value }) => `${formatPrice(value)}` // Formatting price as currency
      },
      {
        Header: 'Rating',
        accessor: 'rating',
        Cell: ({ value }) => {
          // Ensure the rating is formatted to one decimal place
          const formattedRating = value ? value.toFixed(1) : 'N/A' // Format to one decimal place
          return (
            <div className='rating-cell'>
              <FaStar style={{ color: '#ffd700' }} /> {formattedRating}
            </div>
          )
        }
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Action',
        Cell: ({ row }) => {
          // Make item name URL-friendly (replace spaces with hyphens and remove special characters)
          const itemName = row.original.itemName
            .replace(/\s+/g, '-')
            .toLowerCase()

          return (
            <div className='action-links'>
              <Link
                to={`/item-details/${row.original._id}/${itemName}`}
                className='btn-details'
              >
                <MdRemoveRedEye />
              </Link>

              {/* Add more links below */}
              <Link
                to={`/edit-item/${row.original._id}/${itemName}`}
                className='btn-edit'
              >
                <MdEdit />
              </Link>

              <Link
                to={`/delete-item/${row.original._id}`}
                className='btn-delete'
              >
                <MdDelete />
              </Link>
            </div>
          )
        }
      }
    ],
    [brands, categories]
  )

  // Filter function based on search query, category, and brand
  const filteredData = React.useMemo(() => {
    return items.filter(item => {
      const matchesSearchQuery =
        (item.itemName &&
          item.itemName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.category &&
          item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.brand &&
          item.brand.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = categoryFilter
        ? item.category === categoryFilter
        : true
      const matchesBrand = brandFilter ? item.brand === brandFilter : true

      return matchesSearchQuery && matchesCategory && matchesBrand
    })
  }, [items, searchQuery, categoryFilter, brandFilter])

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)

  // Calculate the start and end index for slicing the data for current page
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Using react-table hooks with filters
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: filteredData,
      initialState: {
        filters: []
      }
    })

  // Add animation for each row using react-spring
  const transitions = useTransition(rows, {
    keys: row => row.id,
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(20px)' }
  })

  // Go to a specific page
  const goToPage = page => {
    if (page < 1) page = 1
    if (page > totalPages) page = totalPages
    setCurrentPage(page)
  }

  return (
    <div className='view-items'>
      <div className='head'>
        <p>Items</p>
        <MdKeyboardDoubleArrowRight />
        <p>View Items</p>
      </div>

      <h2>All Items</h2>

      <div className='filters'>
        <select
          className='rows'
          value={rowsPerPage}
          onChange={e => setRowsPerPage(Number(e.target.value))}
        >
          <option value={2}>15 orders</option>
          <option value={4}>30 orders</option>
          <option value={8}>50 orders</option>
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

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table {...getTableProps()} className='items-table'>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {transitions((style, row) => {
                prepareRow(row)
                return (
                  <animated.tr {...row.getRowProps()} style={style}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </animated.tr>
                )
              })}
            </tbody>
          </table>
          <ToastContainer />
        </>
      )}
      {/* Pagination */}
      <div className='pagination'>
        <button
          className='prev-page'
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className='page-number'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className='next-page'
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ViewItems
