# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run  `yarn start`  Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Mock-data from

https://www.mockaroo.com/

How to create a table with React Tables

__Note naming conventions are important to ensure the right data is called matching the right table column and row__

1. Set up mock-data for the table in a json-file

Naming convention:
Use template-strings for the name of the json file ```MOCK_NAME_DATA```

eg: For for users ```MOCK_USER_DATA``` and for products ```MOCK_PRODUCT_DATA```


2. Define columns ui for the information to be displayed (select only data you want displayed)

Naming convention:
Use template-strings there can be only one master columns file

eg: ```COLUMNS.js``` the first letter in upper-case as it is a constructor creating an instance of the user's information 
Assign the data to a variable ```const COLUMNS ``` 


There are 2 key-value pairs in the array of objects you are creating - a Header & accessor key with their json-data values.

Header - the value is the string value of the title on the column header that will be displayed on the ui, Header is upper case
accessor - the value is the json-value defined in your json data, accessor is lower case

There can be no duplicate values

```
[
    {
      Header: 'Id',    
      accessor: 'id',
    },
    {
        Header: 'Title',    
        accessor: 'title',
      },
      {
        Header: 'Last Name',    
        accessor: 'last-name',
      },
      {
        Header: 'Mobile Phone',    
        accessor: 'phone',
      }
]
```

3. Create a table object with a functional component - import the ```useTable``` & ```useMemo``` hooks, import the mock data and the columns you have defined to render.

Memoization is an optimization technique which passes a complex function to be memoized (stored in memory). In memoization, the result is “remembered” when the same parameters are passed-in subsequently. On a component re-render, the function won’t re-run but instead return the stored result. This can be optimal if the wrapped function is large and expensive. That is the primary use for useMemo.

- More about useMemo [https://www.robinwieruch.de/react-usememo-hook]
- When not to use the useMemo hook [https://blog.logrocket.com/rethinking-hooks-memoization/]
- A quick tutorial [https://www.digitalocean.com/community/tutorials/react-usememo]


4. Define jsx elements required for a table in an enclosing section - i.e. the table jsx, the table body, the table head, the table head cells, the table rows, the table row cells that will render the table data that you want to display

5. Rendering the data with the ```useTable``` hook comes with the following built-in methods

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

6. Style to preference