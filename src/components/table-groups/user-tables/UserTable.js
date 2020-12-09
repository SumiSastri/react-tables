import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'

import MOCK_USER_DATA from '../../mock-data/users/MOCK_USER_DATA'
import {GROUPED_COLUMNS } from '../../mock-data/users/USER_TABLE_INFO'
import '../../table-styles/tableStyles.css'

export const UserTable = () => {
    const columns = useMemo(() => GROUPED_COLUMNS, [])  
    const data = useMemo(() => MOCK_USER_DATA, [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // footerGroups,
        rows,
        prepareRow
      } = useTable ({
       columns,
       data,
    },
    useSortBy
  )
    
    return (
<div>
  <h3>JSON-users table with Hooks</h3>
    <table{...getTableProps()}>
        <thead>
                {
                    headerGroups.map((headerGroup => 
                        (<tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map( column => (
                          <th {...column.getHeaderProps()}>{column.render('Header')}
                          <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                          
                          
                          </th>
                        ))}
                      </tr>)))
                }
        </thead>
        <tbody{...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                              })}
                            </tr>
                          )
                        })}
        </tbody>   
    </table>
</div>
    )
}
