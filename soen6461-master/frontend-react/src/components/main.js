import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';


import Listing from './listing'
import Login from './login'
import ListinDetails from './listingDetails'
import ClientListing from './clientListing'
import TranListing from './transactions';
import AdminCarListing from './Admin';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      carData: '',
      clientData: ''
    }
  }
  render() {
    const CharWithId = ({match}) => {
      return(
          <ListinDetails 
            selectedCar = {this.state.carData.filter((car) => car.carId == match.params.carId)}
          />
      )
    }

    return (
      <div>
        <Switch>
              <Route exact path='/' component={() => <Login/>} />
              <Route exact path='/home' component={() => <Listing listing={''} />} />
              <Route exact path='/features' component={() => <ClientListing clientList = {''}/>} />
              <Route exact path='/transactions' component={() => <TranListing/>} />
              <Route exact path='/cars' component={() => <AdminCarListing/>} />
              <Route path='/car/:carId' component={CharWithId}/>
            {/* <Redirect to="/home" /> */}
        </Switch>
      </div>
        
     );
  }
}
 
export default Main;
  
