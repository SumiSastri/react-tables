import React, { useMemo } from 'react'
import { useTable } from 'react-table'

import MOCK_PRODUCT_ONE_DATA from '../../mock-data/products/MOCK_PRODUCT_ONE_DATA'
import { PRODUCT_ONE_TABLE_INFO } from '../../mock-data/products/PRODUCT_ONE_TABLE_INFO'
import '../../table-styles/tableStyles.css'

export const ProductOneTable = () => {
    const columns = useMemo(() => PRODUCT_ONE_TABLE_INFO, [])  
    const data = useMemo(() => MOCK_PRODUCT_ONE_DATA, [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
      } = useTable ({
       columns,
       data,
      })
    
    return (
<div>
    <table{...getTableProps()}>
        <thead>
                {
                    headerGroups.map((headerGroup => 
                        (<tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map( column => (
                          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
