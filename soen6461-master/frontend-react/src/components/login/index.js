import React, { Component } from "react";
import '../../App.css';
import {Container, Row} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logoImage from '../../assests/images/racing.jpg';
import { Redirect } from 'react-router-dom';
import * as Constants from '../../constants'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        error: null,
        user: {},
        isLogin: false
     }
    }
    handleChange = (event) => {
        this.setState({[event.target.id] : event.target.value});
    }
   render(){
      const onLoginBtnClick = () => {
          if(this.state.username.length == 0){
            alert("Please enter your email address!")
          }
          else if (this.state.password.length == 0){
            alert("Please enter your password!")
          }
          else{
            loginAPI(this.state.username, this.state.password)
          }
      }

      const loginAPI = (username,password) => {

        fetch(Constants.loginAPI, {
          method: 'POST',
          body: JSON.stringify({
            username: username,
            password: password
          }),
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
          if (response.ok)
            return response.json()
          throw response.text()
        })
        .then(json => {
          localStorage.setItem("user", JSON.stringify(json));
          localStorage.setItem("type", json.type);
          this.setState({
            user:json,
            isLogin: true
          });
        },
        (error) => {
          error.then((er) => {
            this.setState({
              error: er,
              isLogin: false
            });
            alert(er)
          })
          
        });
    }

    const { isLogin, user } = this.state;
    return(
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Form>
                <img src={logoImage} width="200" height="200"></img>
                   <br/>
                  <Form.Label>Vehicle Reservation System</Form.Label>
                  <Form.Group controlId="username">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control type="username" placeholder="Enter Username" onChange={this.handleChange}/>
                  </Form.Group>

                  <Form.Group controlId="password">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                  </Form.Group>
                  {/* <Link to={`/home`}> */}
                  <Button variant="primary" onClick={() => onLoginBtnClick()}> 
                    Log In
                  </Button>
                  {/* </Link> */}
                  <br/>
                  {/*<Link to={`/home`}>Inside</Link>
                  <Link to={`/signup`}>
                  Create an account  
                  </Link>    */}

            {isLogin && <Redirect
              to={{
                pathname: '/home',
                state: { userDetails: user }
              }} />
            }
                </Form>
            </Row>
        </Container>        
    )
   }
}
 
export default Login;