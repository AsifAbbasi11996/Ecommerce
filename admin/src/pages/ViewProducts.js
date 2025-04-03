import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../api/productsApi' // Adjust the import based on your file structure
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

const ViewProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])

  // Fetching all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        setProducts(data)
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
        toast.error('Failed to load products.')
      }
    }

    fetchProducts()
  }, [])

  // Table columns configuration
  const columns = React.useMemo(
    () => [
      {
        Header: 'Product Image',
        accessor: 'colors', // accessing colors array for the image
        Cell: ({ value }) => {
          if (value && value[0] && value[0].images && value[0].images[0]) {
            const imageUrl = formatImageUrl(value[0].images[0])
            return (
              <img src={imageUrl} alt='Product' className='product-image' />
            )
          }
          return <span>No Image</span>
        }
      },
      {
        Header: 'Product Name',
        accessor: 'productname',
        Filter: ({ filterValue, setFilter }) => (
          <input
            value={filterValue || ''}
            onChange={e => setFilter(e.target.value || undefined)}
            placeholder='Search by name'
            className='filter-input'
          />
        )
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
          const formattedRating = value.toFixed(1) // Format to one decimal place
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
          // Make product name URL-friendly (replace spaces with hyphens and remove special characters)
          const productName = row.original.productname
            .replace(/\s+/g, '-')
            .toLowerCase()

          return (
            <div className='action-links'>
              <Link
                to={`/product-details/${row.original._id}/${productName}`}
                className='btn-details'
              >
                <MdRemoveRedEye />
              </Link>

              {/* Add more links below */}
              <Link
                to={`/edit-product/${row.original._id}`}
                className='btn-edit'
              >
                <MdEdit />
              </Link>

              <Link
                to={`/delete-product/${row.original._id}`}
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
    return products.filter(product => {
      const matchesSearchQuery =
        product.productname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter
        ? product.category === categoryFilter
        : true
      const matchesBrand = brandFilter ? product.brand === brandFilter : true

      return matchesSearchQuery && matchesCategory && matchesBrand
    })
  }, [products, searchQuery, categoryFilter, brandFilter])

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

  return (
    <div className='view-products'>
      <div className='head'>
        <p>Products</p>
        <MdKeyboardDoubleArrowRight />
        <p>View Products</p>
      </div>

      <h2>All Products</h2>

      <div className='filters'>
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
          <option value=''>Filter by Category</option>
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
          <option value=''>Filter by Brand</option>
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
          <table {...getTableProps()} className='products-table'>
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
    </div>
  )
}

export default ViewProducts
