import React, { useMemo } from 'react'
import { useTable } from 'react-table'

import MOCK_USER_DATA from '../../mock-data/MOCK_USER_DATA'
import { COLUMNS } from '../../mock-data/COLUMNS'
import '../table-styles/tableStyles.css'

export const UserTable = () => {
    const columns = useMemo(() => COLUMNS, [])  
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
      })
    
    return (
<div>
<span>/getTableProps()/</span>
<br></br>   
    <table{...getTableProps()}>
        <thead><span>headerGroups[]/getheaderGroupProps()/headers[]/ column[]/ column.render('Header')</span>
                {
                    headerGroups.map((headerGroup => 
                        (<tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map( column => (
                          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                      </tr>)))
                }
        </thead>
        <tbody{...getTableBodyProps()}><span>tbody - getTableBodyProps()/prepareRow()/getRowProps()/ cells[]/getCellProps()/cell.render("Cell") </span>
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
        <br></br>  
           <tfoot><span>Placeholder for footer</span>
        </tfoot> 
    </table>
</div>
    )
}
