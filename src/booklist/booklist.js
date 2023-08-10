import React from 'react';
import axios from 'axios';
import { withStyles } from '@mui/material/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { DataGrid } from '@material-ui/data-grid';

export default class BookList extends React.Component {
  state = {
    books: [],
    bookReview: [],
    params : Object
  }

  componentDidMount() {
    console.log("BookList run")
    this.getBookList()
  }

  getBookList(){
    axios.get(`http://127.0.0.1:8000/books`)
    .then(res => {
      const books = res.data;
      this.setState({ books });
    })
  }
  
  getBookReview(id){
    console.log("book review "+id)
    axios.get(`http://127.0.0.1:8000/book_reviews?book_id=${id}`)
    .then(res => {
      const bookReview = res.data;
      this.setState({ bookReview });
    })
  }

  renderDetailSection(){
    if(this.state.params.row==null){
    return(
    <div style={{width:"50%",display:"flex",justifyContent:"center"}}>
    <h1>Please select any item to see details.</h1>
  </div>
  )
    }else{
      const row=this.state.params.row
      return(
        <div style={{width:"50%",display:"flex", flexDirection:"column"}}>
        <h1>{row.name}</h1>
        <div style={{display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",flexDirection:"row"}}>
          <div>Author : </div>
          <div>{row.author}</div>
        </div>
        <div  style={{display:"flex",flexDirection:"row"}}>
          <div>Description : </div>
          <div>{row.description}</div>
        </div>
        </div>
        <h3>Reviews</h3>
        <div>
        {
        this.state.bookReview.length>0 ?this.state.bookReview.map(function(review){
          return (<li>{review.review}</li>)
         }):<h3>No review found.</h3>
       }
        </div>
      </div>)
    }
  }
 
  render() {
    return (
        <div style={{display:"flex",flexDirection:"row",}}>
          <div style={{width:"50%"}}>
        {
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={this.state.books} columns={columns} pageSize={7} onRowClick={ (
  params, 
  event, 
  details, 
) => {
  this.setState({ params });
  this.getBookReview(params.row.id)
}}/>
          </div>
        }
        </div>
        {this.renderDetailSection()}
        </div>
    )
  }
}

const  columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'BOOK NAME', width: 170 },
  { field: 'author', headerName: 'AUTHOR', width: 200 },
];

const  reviewColumns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'review', headerName: 'COMMENT', width: 170 },
];