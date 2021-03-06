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
            const users = await usersApiResponse.json()
            this.setState({ users, loadingUserData: false })
          } else {
            this.setState({ hasErrors: true, loadingUserData: false })
          }
        }

        renderTableHeader = () => {
          return Object.keys(this.state.users[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>) 
        }

        renderTableRows = () => {
          return this.state.users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{`${user.address.street}, ${user.address.city}`}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{user.company.name}</td>
              </tr>
            )
          })
        }
    
        render() {
            const {  hasErrors, loadingUserData, users } = this.state     
            
            if (hasErrors) {
              return <div>Something went wrong, please check again</div>
            }
                   
            if (loadingUserData) {
              return <div>Loading...</div>
            }

            return users.length > 0
              ? (
                <div> 
              <h3>Music Buyers Table with API and stateful component</h3>     
                <table>            
                  <thead>
                    <tr>
                      {this.renderTableHeader()} 
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderTableRows()}
                  </tbody>
                </table>
                </div>         
              ) : (
                <div>
              </div>
              )            
          }        
        }          

export default MusicBuyerTable
