## Steps to create a stateful table 

This component uses server-side rendering of data with the API-endpoint [https://jsonplaceholder.typicode.com/users/] and the ```fetch``` method, http runners like Axios may also be used. Axios helps cross-browser compatibility with API-endpoint requests. 

Client-side storing of data is more secure and recommended.

1. Create the base-class component

Use snippet in VSCode - ```rce``` to create a class component and ```rconst`` to create the constructor for this component.

The state in this component contains the users we are going to fetch from the JSON-placeholder API, the state of whether the data is loading or not and if any errors have been encountered.

The api returns the users as an array of objects, loading and errors are held as boolean values.


2. Add the lifecycle method to call the data
In the life-cycle method ```componentDidMount```the data is called using async-await.  

- There is an assumption that the process will run correctly instantly with errors only being caught as a fall-back safety-net in the else statement
- As the data is loading, the loading variable which is in default state as false is set to true with the ```setState``` method
- We then fetch the data and assign the data from the api call to a variable
- Naming convention: 
An app may use several API's to make it clear which API response the component is waiting for ```nameApiResponse```. 
- We now use the if-else block to check if the data has been returned, with the else block handling the error response if the data has not been returned.
- In the if block we assign the data from the response to the data we want to use in state - here we want the user data from the api which we have assigned to state as an empty array by default.
- To populate this array we use the ```setState``` method again assigning it to a variable with the ```.json``` data and since the loading of the data should be complete, we switch the loading state of data to false to show this process has been completed
- In the else block we now look at the error data and ```setState``` again to handle the errors - if there are errors the default assumption that there are no errors occuring now is switched to true and it is clear the data has not loaded correctly the loading data now is set in state once again to false.

Debugging: - running logs in the code helps you check in the console whether the data has been returned. Other debugging tools like the react-developer tools should also be used to see if you have made a syntax error, why the network has not returned the data in the api-call.

```
   async componentDidMount(){

        this.setState({ loadingUserData: true})

        const usersApiResponse = await fetch('https://jsonplaceholder.typicode.com/users/')
        
        if (usersApiResponse.ok) {
          // console.log(usersApiResponse) 
          //  check data has been fetched
            const users = await usersApiResponse.json()
            // console.log(users)
            // check response returned 
            this.setState({ users, loadingUserData: false })
            // assign the user response to the state data
          } else {
            this.setState({ hasErrors: true, loadingUserData: false })
          }
        }


```


3. Create placeholders to hold the data structure  you want

4. Write a factory function to render the rows - this is a simple map function and will help you see the API-data render

5. Write the factory function to render the table header 

- we require the first object in the array returned
- use the Object.keys() method to map through the object keys
- the key of this object is in the array returned and assigned to state as a users array
- we want the first key of this array and the first object inside it - at element 0 position
- map through this single object to get the headers of the table
- render them to the table header jsx tag
- they key here is the attribute of the element

```
// factory function declaration to render table headers
        renderTableHeader = () => {
          return Object.keys(this.state.users[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>) 
        } 

```
6. Now that you have successfully rendered both the header and one table row display the rest of the rows and information