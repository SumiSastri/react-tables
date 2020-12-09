import React, { useState } from 'react'
// sets a timeout so that the search completes before 300secs
import { useAsyncDebounce } from 'react-table'

// props are filter & setFilter from parent component ProductOneTable
export const GlobalSearchFilter = ({ filter, setFilter }) => {

  // uses the debounce hook to set state and on change event after 300 milliseconds
  const [value, setValue] = useState(filter)
  const onChange = useAsyncDebounce(value => {
    setFilter(value || undefined)
  }, 300)

  return (
    <span>
      <h5>Search this page:{' '}
      <input
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      </h5>
    </span>
  )
}