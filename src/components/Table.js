import React, { Component } from 'react';

// api call
import axios from 'axios';

//css
import './Table.css'

class Table extends Component {
    state = { 
        data:[],
        id:"",
        image:"",
        thumbnailUrl:"",
        page:1,
        loader:true,
        filteredResults:[],
        search:''
     }

     renderTableData=()=> {

      let  filteredResults=this.state.data.filter(
        (contact)=>{
            return contact.phone.indexOf(this.state.search)!==-1
        }
      )
     
        return filteredResults.map((photos) => {
          const { name,nat,phone,picture,gender } = photos
            return (
              <tr >
                   <td>  
                     <input type="checkbox" 
                       aria-label="Checkbox for following text input" />
              </td>
                  <td><img src={picture.thumbnail} /></td>
                  <td>{phone}</td>
                  <td>{nat}</td>
                  <td>{gender}</td>
                  <td>{name.first}</td>
              </tr>
              )
            })
      }

      loadMoreHandle=(e)=>{
      //know the height of scroll --- gap in bottm
      let bottom =e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop <50
      //gone to bottom
      if(bottom){
        let page_=this.state.page+1
        this.fetchdata(page_)
        this.setState({loader:true})
        this.setState({page:page_})
      }
      }

     componentDidMount() {
       this.fetchdata(this.state.page)
     }

    fetchdata=(page)=>{
      axios.get(`https://randomuser.me/api/?${page}=3&results=10`)
      .then(res => {
        console.log(res.data.results)
        if(page >1){
          let resultArray=[...this.state.data,...res.data.results]
          this.setState({data:resultArray})
        }else {
          this.setState({data:res.data.results})
        }
        this.setState({loader:false})
     
      })
    }
    handleSearch=(e)=>{
      this.setState({search:e.target.value})
  }
    render() { 
       return (
          <div className="container">
            <div className="text-left"><ul>
              <li className="first-list-element">ALL</li>
              </ul></div>
            <hr />
            <div className="flex">
            <button type="button" class="btn btn-secondary">Filter</button>
             <input type="text" 
              class="form-control" 
              aria-label="Sizing example input" 
              aria-describedby="inputGroup-sizing-sm"
              onChange={this.handleSearch} 
              value={this.state.search} 
              placeholder="Search Products"
              style={{position:"relative"}}
              />
              <span style={{position:"absolute", marginLeft: "8.25rem"}}>

              <i class="fa fa-search"></i>
              </span>
            
             </div>
             <div onScroll={this.loadMoreHandle} className="table-wrap">     
          <table className="table table-hover">
             <tbody>
               <tr><th className="border-top-none"></th>
                 <th className="border-top-none"></th>
                 <th className="border-top-none">Product</th>
                 <th className="border-top-none">Inventory</th>
                 <th className="border-top-none">Type</th>
                 <th className="border-top-none">Vendor</th></tr>
               {this.renderTableData()}
               <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
               </div>
             </tbody>
          </table>
          </div>
          </div>
          );
    }
}
 
export default Table;