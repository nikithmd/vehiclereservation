import React from 'react';

import {Navbar, Nav} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import * as Constants from '../constants'


const Navigation = (props) => {
    const type = Boolean(parseInt(localStorage.getItem('type'), 10));
    
    const onBtnClick = () => {
        localStorage.removeItem('type');
        callLogoutAPI();
    }


    const callLogoutAPI = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        fetch(Constants.logoutAPI + user.username)
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result)
              let path = `/`;
              props.history.push(path);
          },
          (error) => {
          }
        )
    }
    
    return (
        <React.Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Vehicle Reservation System</Navbar.Brand>
                <Nav className="justify-content-end">
                    {!type && <Nav.Link href="/transactions">Transactions</Nav.Link>}
                    <Nav.Link href="/home">Vehicle Catalogue</Nav.Link>
                    {type && <Nav.Link href="/features">Client</Nav.Link>}
                    {!type && <Nav.Link href="/cars">Vehicles</Nav.Link>}
                    <button className="btn btn-danger logout" type="submit" onClick={() => onBtnClick("")}>Logout</button>
                </Nav>
            </Navbar>            
        </React.Fragment>
    );
}
 
export default withRouter(Navigation);