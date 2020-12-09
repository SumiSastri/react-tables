import React, { useMemo } from 'react'
// hooks for tables
import { useTable, useSortBy, useGlobalFilter, useFilters, useColumnOrder } from 'react-table'

import MOCK_PRODUCT_ONE_DATA from '../../mock-data/products/MOCK_PRODUCT_ONE_DATA'
import { PRODUCT_ONE_TABLE_INFO } from '../../mock-data/products/PRODUCT_ONE_TABLE_INFO'
import '../../table-styles/tableStyles.css'
import { GlobalSearchFilter } from '../../filters/GlobalSearchFilter'
import { ColumnSearchFilter } from '../../filters/ColumnSearchFilter'
// import {Checkbox} from '../../checkboxes/Checkbox'
import {CheckboxHook} from '../../checkboxes/CheckboxHook'

export const ProductOneTable = () => {
    
    const columns = useMemo(() => PRODUCT_ONE_TABLE_INFO, [])  
    const data = useMemo(() => MOCK_PRODUCT_ONE_DATA, [])

    // column filtering memoization
    const defaultColumn = React.useMemo(
      () => ({
        Filter: ColumnSearchFilter
      }),
      []
    )

      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps,
        setColumnOrder,
        state,
        // function to set the global filter text value
      setGlobalFilter
      } = useTable ({
       columns,
       data,
      //  add default column for search filter after data is passed this param is used as an arg
       defaultColumn,
      },
      // add hooks global filter before useSortBy
      useFilters,
      useGlobalFilter,
      useSortBy, 
      useColumnOrder
    )

    // use accessor to change column order, factory function for onClick handler
    const changeOrder = () => {
      setColumnOrder(['id', 'item',  'date', 'check-yes-no', ])
  }

  //  Table state deconstructed to extract only the global filter
    const { globalFilter } = state
    return (
<div>
  <div><h3>Product Table with JSON-data/ Hooks & sort, search, filter functionality</h3></div>
  <div><button onClick={changeOrder}>Change column order</button></div>
  {/* set props for the imported child component */}
  <div><GlobalSearchFilter filter={globalFilter} setFilter={setGlobalFilter} /></div>
  
  <div>
    {/* the behaviour of the 2 check boxes is slightly different uncomment import and change to see the difference */}
          <CheckboxHook {...getToggleHideAllColumnsProps()} /> Check to show all
        </div>
        <p>Check to hide column</p>
        {allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type='checkbox' {...column.getToggleHiddenProps()} />{' '}
              {column.Header}
            </label>
          </div>
        ))}
        <br />

    <table{...getTableProps()}>
        <thead>
                {
                    headerGroups.map((headerGroup => 
                        (<tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map( column => (
                          // pass hook as a prop
                          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                        <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  {/* render the filter by adding the methods to the column hook */}
                  <div>{column.canFilter && column.render('Filter') }</div>
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
         <tfoot>
         {footerGroups.map(footerGroup => (
           <tr {...footerGroup.getFooterGroupProps()}>
             {footerGroup.headers.map(column => (
               <td {...column.getFooterProps()}>{column.render('Footer')}</td>
             ))}
           </tr>
         ))}
       </tfoot>
    </table>
  
</div>
    )
}
