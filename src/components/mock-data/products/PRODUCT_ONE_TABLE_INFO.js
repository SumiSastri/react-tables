import {ColumnSearchFilter} from '../../filters/ColumnSearchFilter'
import {Checkbox} from '../../checkboxes/Checkbox'

export const PRODUCT_ONE_TABLE_INFO = [
    {
      Header: 'Id',   
      Footer: 'Id',    
      accessor: 'id',
      Filter: ColumnSearchFilter,
      disableFilters: true
    },
    {
        Header: 'Item', 
        Footer: 'Item',   
        accessor: 'item',
        Filter: ColumnSearchFilter
      },  
      {
        Header: 'Photo', 
        Footer: 'Photo',   
        accessor: 'photo',
        Filter: ColumnSearchFilter,
        disableFilters: true
      },
      {
        Header: 'Is available', 
        Footer: 'Is available', 
        accessor: 'check-yes-no',
        Filter: ColumnSearchFilter,
        disableFilters: true,
        Checkbox: Checkbox
      },
      {
        Header: 'Date',   
        Footer: 'Date',  
        accessor: 'date',
        Filter: ColumnSearchFilter
      },
      
] 