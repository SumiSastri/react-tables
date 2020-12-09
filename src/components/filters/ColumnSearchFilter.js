import React from 'react'

// props are columns
export const ColumnSearchFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <span>
      <p>Search this column:{' '}
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
      </p>
    </span>
  )
}