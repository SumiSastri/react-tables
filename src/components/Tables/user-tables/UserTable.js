// memoize rows and columns as tables run expensive functions
import React, { useMemo } from 'react'
// react hook for table constructor
import { useTable } from 'react-table'
// data that the table is dependent on
import MOCK_USER_DATA from '../../mock-data/MOCK_USER_DATA'
// array of columns
import { COLUMNS } from '../../mock-data/COLUMNS'

import '../table-styles/tableStyles.css'



export const UserTable = () => {

// use memo is a call back function -  with 2 args the first is a function, the second is the array dependency
    const columns = useMemo(() => COLUMNS, [])
    
    //  use memo memorises the data so that the react table does not run the function on each re-render but runs its stored value
    const data = useMemo(() => MOCK_USER_DATA, [])

    // the use table hook outlines the object that will use the table information and data to be rendered in every user table instance
    // const userTableInstance = useTable({
    //     userTableInfo,
    //     mockUserData
    // })

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
  
    <table{...getTableProps()}><span>Placeholder for getTableProps method</span>   
        <thead><span>headerGroups[]/getheaderGroupProps()/headers[]/ column[]/ column.render('Header')</span>
                {
                    headerGroups.map((headerGroup => 
                        (<tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map( column => (
                          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                      </tr>)))
                }
                    <tr><span>tr placeholder</span>
                    <th><span>th placeholder</span></th>
                    </tr>
        </thead>
<hr></hr>
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
                    <tr><span>tr placeholder</span>
                        <td><span>td placeholder</span></td>           
                    </tr>
        </tbody>
        <br></br>  
           <tfoot><span>Placeholder for footer</span>
        </tfoot> 
    </table>
</div>
    )
}
