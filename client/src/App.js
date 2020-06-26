import React ,{Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';


import Login from './component/user/login/login';
import MainPage from './component/mainPage';
import LoginForm from './component/reduxLoginForm';
import Header from './component/header';

import Register from './component/user/signup/register';
import Auth from './hoc/auth';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
      <Header />
      <div className="App">
        <Switch>
           <Route path='/mainPage' component={Auth(MainPage,true)} exact />
          <Route path='/' component={Login} exact />
          <Route path="/login" component={LoginForm} exact />
          <Route path="/register"  component={Register} exact />
        </Switch>
        </div>
      </BrowserRouter>
    )
  }
}





export default App;
