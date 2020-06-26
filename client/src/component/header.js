import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {IconButton,Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


class Header extends Component {


  render(props){
    return (
      <div >
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" style={{marginRight:'2px'}} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{flexGrow:'1'}} >
              <Link to="/" style={{color:'#fff',textDecoration:'none'}} >Student Management System</Link>
            </Typography>
              {
               this.props.user.auth ? <Button style={{color:'#fff',textDecoration:'none'}}>Logout</Button> : 
               <Link to='/register' style={{color:'#fff',textDecoration:'none'}} >SIGNUP</Link>
              }
            
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    user:state.user
  }
}

export default connect(mapStateToProps)(Header);