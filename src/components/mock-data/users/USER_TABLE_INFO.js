export const USER_TABLE_INFO = [
    {
      Header: 'Id',    
      accessor: 'id',
    },
    {
        Header: 'First Name',    
        accessor: 'first-name',
      },  
      {
        Header: 'Last Name',    
        accessor: 'last-name',
      },
      {
        Header: 'Mobile Phone',    
        accessor: 'phone-number',
      },
      {
        Header: 'Email',    
        accessor: 'email-address',
      },
      
]   

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    accessor: 'id'
  },
  
  {
  Header: 'Users',
  columns: [
  {
      Header: 'First Name',    
      accessor: 'first-name',
    },  
    {
      Header: 'Last Name',    
      accessor: 'last-name',
  },
]
  },

  {
  Header: 'Contact Details',
    columns: [
      {
        Header: 'Mobile Phone',    
        accessor: 'phone-number',
      },
      {
        Header: 'Email',    
        accessor: 'email-address',
      },
    ]
  },
    ]

  





