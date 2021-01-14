import Signin from './user/Signin'
import Signup from './user/Signup'
import Menu from '../src/layout/Menu'
import UserDashboard from './user/UserDashboard'
import Shop from './core/Shop'
import Home from './core/Home'
import ViewProduct from './core/ViewProduct'
import Cart from './core/Cart'
import Checkout from './core/Checkout'
import UpdateUser from './user/UpdateUser'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Menu/> */}
      <Switch>
          <Route  path = '/'  exact component = {Home}/>
          <Route  path = '/signin' exact component = {Signin}/>
          <Route  path = '/signup' exact component = {Signup}/>
          <Route  path = '/product/:productId' exact  component = {ViewProduct}/>
          <Route  path = '/shop' exact component = {Shop}/>
          <Route  path = '/cart' exact  component = {Cart}/>
          <Route  path = '/checkout' exact  component = {Checkout}/>
          <Route  path = '/userdashboard/:userId' exact  component = {UserDashboard}/>
          <Route  path = '/userdashboard/update/:userId' exact component = {UpdateUser}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
