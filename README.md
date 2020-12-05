# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run  `yarn start`  Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Mock-data from

https://www.mockaroo.com/

## Steps to create a table with the useTable Hook

__Note naming conventions are important to ensure the right data is called matching the right table column and row__

1. Data set-up create a mock-data folder

Mock-up some ```.json``` data from Mockaroo

Naming convention:
Use template-strings for the name of the json file ```MOCK_NAME_DATA```

eg: For for users ```MOCK_USER_DATA``` and for products ```MOCK_PRODUCT_DATA```

Create an array of data in a ```.js``` file

Naming convention:
Use template-strings for the array of data you are mapping from the json file ```USER_TABLE_INFO```  and for products ```PRODUCT_TABLE_INFO```


There are 2 key-value pairs in the array of objects you are creating - they are always called Header & accessor.

Header - the value is the string value of the title on the column header that will be displayed on the ui, Header is upper case
accessor - the value is the json-value defined in your json data, accessor is lower case

There can be no duplicate values 

The data will appear in exactly the same order as defined in the columns array file, so think about the data order in the display and then create the array.

Assign the data to a variable
Naming covention use the same name as the file name
eg: ```USER_TABLE_INFO```  and for products ```PRODUCT_TABLE_INFO```

An example of the column data array you are creating and exporting in this ```.js``` file

```
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
]
```

2. Display Page - create a table-groups folder for all the tables you want to display

Naming convention - make clear categories of tables that can be grouped together
product-tables
user-tables

Naming convention:
Within these sub-folders you may have several product tables the first letter in upper-case as it is a constructor creating an instance of the user's/ product's information 
eg: ```UserTable.js``` or ```ProductTable.js``` 

In the individual table page, create a table object with a functional component - import the ```useTable``` & ```useMemo``` hooks from React & import the mock data and the columns you have defined to render.

Memoization is an optimization technique which passes a complex function to be memoized (stored in memory). In memoization, the result is “remembered” when the same parameters are passed-in subsequently. On a component re-render, the function won’t re-run but instead return the stored result. This can be optimal if the wrapped function is large and expensive. That is the primary use for useMemo.

- More about useMemo [https://www.robinwieruch.de/react-usememo-hook]
- When not to use the useMemo hook [https://blog.logrocket.com/rethinking-hooks-memoization/]
- A quick tutorial [https://www.digitalocean.com/community/tutorials/react-usememo]

Create two variables called columns and data and memoize them. The ```useMemo()``` method takes a function as its first argument and an array as the second. They must only be called columns and data as these variables are reassigned for use by the ```useTable``` hook.

```
const columns = useMemo(() => USER_TABLE_INFO, [])  
const data = useMemo(() => MOCK_USER_DATA, [])
```   

In the return statement, define jsx elements required for a table in an enclosing React Fragment/ table wrapper - i.e. the table jsx, the table body, the table head, the table head cells, the table rows, the table row cells that will render the table data that you want to display

Now you can avail of the ```useTable``` hook comes with the following built-in methods that you can use nested in each jsx component.

```
        getTableProps() - getter func called in the table jsx get the prop of the parent table jsx tag
       
        headerGroups() - nested in the table head jsx tag maps through an array of header-items 
        getHeaderGroupProps() - gets all the props of the headerGroups func - which are headers
        headers() - maps through headers
        columns() - chained to the headers method
        column.render() - renders the column header cell elements in the table header jsx nested in the table row jsx

        getTableBodyProps() - getter func called in the  table body jsx

        rows() - nested row cells with an array of elements to map into a row
        prepareRow() - called to prepare each row and return the table row jsx
        getRowProps() - called in the table row jsx before you map 
        row.cells() - called after getRowProps called to map individual elements of the array to be rendered in the table row cells 
        getCellProps() - called in the table data jsx and within the table data jsx and then
        cell.render() - method called to render the individual row cell

        footerGroups() -
        getFooterGroupProps()
        footerGroups.headers()
        columns()
        columns.render()
      
```        

In this repo 2 tables have been created for users and products examples of the code are in the respective folders, to follow as examples.

6. Style to preference