import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { searchItems } from '../api/itemApi' // Assuming this is already correct
import { formatImageUrl } from '../utils/formatImage'
import { formatPrice } from '../utils/formatPrice'

const Search = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const query = new URLSearchParams(useLocation().search).get('q') // Get the query from URL

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        setLoading(true)
        setError(null)
        try {
          const searchResults = await searchItems(query)
          setResults(searchResults)
        } catch (error) {
          setError('Failed to fetch search results')
        } finally {
          setLoading(false)
        }
      }
    }

    fetchSearchResults()
  }, [query]) // Re-run when query changes

  return (
    <div>
      <h1>Search Results</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {results.length > 0 ? (
          <ul>
            {results.map(item => (
              <li key={item._id}>
                <h3>{item.itemName}</h3>
                <p>{item.brand}</p>
                <p>{item.itemdetail.join(' ')}</p>
                <p>Price: {formatPrice(item.sp)}</p>
                <p>Rating: {item.rating}</p>
                {item.images && item.images.length > 0 && (
                  <img
                    src={formatImageUrl(item.images[0])} // Assuming images are served statically from this path
                    alt={item.itemName}
                    style={{ width: '100px' }}
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  )
}

export default Search
