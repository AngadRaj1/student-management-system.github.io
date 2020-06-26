import React, { Component } from 'react';
import axios from 'axios';
import { connect }  from 'react-redux';
import {Link} from 'react-router-dom';

import { Container } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



class MainPage extends Component{

    state={
        posts:[]
    }

 componentDidMount(){
   axios.get('http://localhost:3005/api/user/getUser')
  .then(response =>{
      this.setState({
          posts: response.data.userData
      })
  })
  .catch(error=>{
      console.log(error)
  })
}



    render(){
        const {posts} = this.state;
    return(
            <Container>
            <TableContainer>
                <h1 style={{textAlign:'center'}}>List of the registered user</h1>
                {/* <Button onClick={this.onHandleClick}>Logout</Button> */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Id</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Email Address</TableCell>
                            <TableCell>Mobile Number</TableCell>
                            <TableCell>Higher Education</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            posts.map((item,index)=>(
                                <TableRow key={index}>
                                    <TableCell>
                                        <Link to={`/admin/posts/edit/${item._id}`}>{item._id}</Link>
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                     <TableCell>{item.email}</TableCell>
                                     <TableCell>{item.mnumber}</TableCell>
                                     <TableCell>{item.degree}</TableCell>
                                     <TableCell><EditIcon fontSize="medium" color="primary"></EditIcon></TableCell>
                                     <TableCell><DeleteIcon fontSize="medium" color="secondary"/></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            </Container>
        );
    }   
}

const mapStateToProps =(state) =>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(MainPage);