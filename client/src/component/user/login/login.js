import React, { Component } from 'react'
import {Formik} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { loginUser } from '../../../store/action/user_action';
import './login.css'
import {Link} from 'react-router-dom';



const LoginSchema = Yup.object().shape({
  password:Yup.string()
  .min(6,'Too short !!')
  .required('Required !!'),
  email: Yup.string('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+[A-Z]{2,4}$/i')
  .email('Invalid email.!')
  .required('Required !!')
})

class Login extends Component {

  state={
    success:false,
    validation:false
  }

  static getDerivedStateFromProps(props,state){
    const auth = props.user.auth;

      if(auth){
        return{
          success: auth ? true : false
        }
      }
  }

  componentDidUpdate(){
    if(this.state.success){
      this.props.history.push('/mainPage')
    }
  }

  render() {
    return (
      <div className="container">
         <h3>Sign in here</h3>
         <hr />
         
         <Formik
          initialValues={{email:'raj1@gmail.com',password:'raj123'}}
          validationSchema={LoginSchema}
          onSubmit={values=>{
            this.props.dispatch(loginUser(values)).then(response=>{
              if(!this.props.user.auth){
                this.setState({
                  validation:true
                })
              }
            })
          }}
         >
           {({
             values,
             errors,
             touched,
             handleChange,
             handleBlur,
             handleSubmit
           })=>(
             <form onSubmit={handleSubmit}>
               <div className="row">
                  <div className="twelve-columns">
                    <p>User Name</p>
                      <input 
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Enter your email"
                        className="u-full-width"
                      />
                      {errors.email && touched.email ?
                      <div className="error_label">{errors.email}</div>
                    : null}
                  </div>
              
                  <div className="twelve-columns">
                    <p>Password</p>
                      <input 
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Enter your password"
                        className="u-full-width"
                      />
                      {errors.password && touched.password ?
                      <div className="error_label">{errors.password}</div>
                    : null}
                  </div>
                 <button type="submit" className="btn">Login</button>
                 <br/>
                 <Link to="/register" className="btn-signup">Don't have an account? Sign Up</Link> 
               </div>
               {
                 this.state.validation ? 
                    <div className="error_label">
                      Error , Please try again,
                    </div>
                 : null
               }
             </form>
           )}
         </Formik>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user:state.user
  }
}

export default connect(mapStateToProps)(Login);
