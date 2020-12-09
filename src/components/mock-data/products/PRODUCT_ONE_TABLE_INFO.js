import {ColumnSearchFilter} from '../../filters/ColumnSearchFilter'

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
        disableFilters: true
      },
      {
        Header: 'Date',   
        Footer: 'Date',  
        accessor: 'date',
        Filter: ColumnSearchFilter
      },
      
] 