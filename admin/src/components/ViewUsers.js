import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../api/userApi' // Adjust the import based on your file structure
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
import { formatDate } from '../utils/formatDate'

const ViewUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Fetching all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers()
        setUsers(data)
        setLoading(false)
        console.log(data)
      } catch (error) {
        setLoading(false)
        toast.error('Failed to load users.')
      }
    }

    fetchUsers()
  }, [])

  // Table columns configuration
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'firstName', // We'll display 'firstName' and 'lastName' together
        Cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
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
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Phone',
        accessor: 'phone'
      },
      {
        Header: 'Account Status',
        accessor: 'accountStatus',
        Cell: ({ value }) => (value === 0 ? 'Active' : 'Inactive')
      },
      {
        Header: 'Action',
        Cell: ({ row }) => {
          const userName = row.original.firstName
            .replace(/\s+/g, '-')
            .toLowerCase()

          return (
            <div className='action-links'>
              <Link
                to={`/user-details/${row.original._id}/${userName}`}
                className='btn-details'
              >
                <MdRemoveRedEye />
              </Link>

              <Link to={`/edit-user/${row.original._id}`} className='btn-edit'>
                <MdEdit />
              </Link>

              <Link
                to={`/delete-user/${row.original._id}`}
                className='btn-delete'
              >
                <MdDelete />
              </Link>
            </div>
          )
        }
      }
    ],
    []
  )

  // Filter function based on search query and account status
  const filteredData = React.useMemo(() => {
    return users.filter(user => {
      const matchesSearchQuery =
        (user.firstName &&
          user.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.lastName &&
          user.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.email &&
          user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.phone &&
          user.phone.toString().includes(searchQuery.toLowerCase()))

      const matchesStatus = statusFilter
        ? user.accountStatus.toString() === statusFilter
        : true

      return matchesSearchQuery && matchesStatus
    })
  }, [users, searchQuery, statusFilter])

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
    <div className='view-users'>
      <div className='head'>
        <p>Users</p>
        <MdKeyboardDoubleArrowRight />
        <p>View Users</p>
      </div>

      <h2>All Users</h2>

      <div className='filters'>
        <input
          type='text'
          placeholder='Search by Name, Email, or Phone'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className='search-bar'
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className='filter-select'
        >
          <option value=''>Filter by Status</option>
          <option value='0'>Active</option>
          <option value='1'>Inactive</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table {...getTableProps()} className='users-table'>
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
                  <animated.tr
                    {...row.getRowProps()}
                    style={style}
                    key={row.id}
                  >
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

export default ViewUsers
