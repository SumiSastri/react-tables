import React, { Component } from 'react'

export class MusicBuyerTable extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users:[],
             loadingUserData: false,
             hasErrors: false,

        }
    }
    async componentDidMount(){
        this.setState({ loadingUserData: true})

        const usersApiResponse = await fetch('https://jsonplaceholder.typicode.com/users/')
        if (usersApiResponse.ok) {
          // console.log(usersApiResponse) 
          //  check data has been fetched
            const users = await usersApiResponse.json()
            console.log(users)
            // check response returned - check with react dev tools as well 
            this.setState({ users, loadingUserData: false })
            // assign the user response to the state data
          } else {
            this.setState({ hasErrors: true, loadingUserData: false })
          }
        }
// factory function declaration to render table headers
        renderTableHeader = () => {
          // use the Object.keys method to locate key-value pairs of the users: users object that has been assigned to state
          // map through the array of the usersApiResonse array 
          // render the map to the jsx th tags
          return Object.keys(this.state.users[0]).map(() => <th></th> )
        }
    
        render() {
            const { users, loadingUserData, hasErrors } = this.state
                   
            if (loadingUserData) {
              return <div>Loading...</div>
            }
        
            if (hasErrors) {
              return <div>Something went wrong, please check again</div>
            }
        // if there are more users than 0 in the response
            return users.length > 0
              ? (
          <div>
                <h3>Music Buyers Table with API and stateful component</h3>
          
                <table>            
                  <thead>
                    <tr>
                      Place-holder for Table Header: <p>{users.id}</p> 
                      {/* {this.renderTableHeader()} */}
                    </tr>
                  </thead>
                  <tbody>
                    PlaceHolder for Table Rows
                 {users.username}
                    {/* {this.renderTableRows()} */}
                  </tbody>
                </table>
                </div> 
             
              ) : (
                <div>
                  No users.
              </div>
              )
              
          }  
       
        }          

export default MusicBuyerTable