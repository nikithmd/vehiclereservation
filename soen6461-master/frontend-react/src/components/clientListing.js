import React, { Component } from 'react';
import Navigation from './navigation';

import {Container, Row, Col, ListGroup, Button, ButtonToolbar, Form} from "react-bootstrap";
import Popup from "reactjs-popup";
import ClientForm from './clientForm'
import * as Constants from '../constants'
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
  
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

class ClientListing extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            // clientData: this.props.clientList
            error: null,
            isLoaded: false,
            clientItems: [],
            showEditPanel: false,
            eachElementData: null,
            uExpiryDate: ''
        }
    }
    handleSubmit = (event) => {
        console.log("event",this.state.eachElementData)
        const unilicNum = document.querySelector('#uniqueLNum').value;
        const updatedfName = document.querySelector('#ufname').value;
        const updatedlName = document.querySelector('#ulname').value;
        const updatedPhone = document.querySelector('#uPhone').value;

        let dateObj = new Date(this.state.uExpiryDate);
        if(this.state.uExpiryDate == ''){
            dateObj = new Date(this.state.eachElementData.expiry_date);
        }
        console.log("dateObj", dateObj)

        let momentObj = moment(dateObj);
        let momentString = momentObj.format('DD MMM YYYY');
        console.log("momentString", momentString)
        let body = {
            firstName:updatedfName,
            lastName:updatedlName,
            driverLicense: unilicNum,
            expiryDate: momentString,
            phoneNumber: updatedPhone,
          };
        //PUT CALL - after RESPONSE
        this.putData(body)
        event.preventDefault();
    }

    handleChangeDate = date => {
        this.setState({
            uExpiryDate: date
        });
    };

    EditPanel = ({elementData}) => {
        var dateObj = new Date(elementData.expiry_date);
            var momentObj = moment(dateObj);
            var momentString = momentObj.format('DD/MM/YYYY');
            console.log("yoooo",momentString)
        return (
            <Container>
                <Row className="justify-content-md-center mt-5">
                    <Form className = "widht100 formDesign" onSubmit={this.handleSubmit}>
                        <Form.Group as={Row} controlId="uniqueLNum">
                            <Form.Label column sm="2">
                                Licence Number
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={elementData.driver_license} />
                            </Col>
                        </Form.Group>    
                        <Form.Group controlId="ufname"  as={Row}>
                            <Form.Label column sm="2">
                                First Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control defaultValue={elementData.first_name} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="ulname">
                            <Form.Label column sm="2">
                                Last Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control defaultValue={elementData.last_name} />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="uPhone"  as={Row}>
                            <Form.Label column sm="2">
                                Phone Number
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control defaultValue={elementData.phone_number} />
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="uEdate"  as={Row}>
                            <Form.Label column sm="2">
                                Licence Expiry Date
                            </Form.Label>
                            <Col sm="10">
                                {/* <Form.Control defaultValue={momentString} /> */}
                                <DatePicker
                                    selected={this.state.uExpiryDate}
                                    onChange={date => this.handleChangeDate(date)}
                                    minDate={new Date()}
                                    placeholderText = {momentString}
                                    dateFormat="dd/MM/yyyy"
                                />   
                            </Col>
                        </Form.Group>    
                        
                        {/* <ButtonToolbar>
                        <Button variant="primary" className="marginRight10" type="submit" value="Submit">Update</Button>
                        <Button variant="danger" onClick={this.setState({showEditPanel: false})}>Cancel</Button>
                        </ButtonToolbar> */}
                        <Button variant="primary" className = "marginRight10"  type="submit" value="Submit"> 
                            Update
                        </Button>
                    </Form>
                    <Button variant="danger" type = "cancel" onClick = {()=>this.cancelUpdate()}> 
                            Cancel
                    </Button> 
                </Row>
                <br/>
            </Container>
        )
    }

    getData = () => {
        fetch(Constants.clientsAPI)
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result)
                this.setState({
                    isLoaded: true,
                    clientItems: result
                });
                localStorage.setItem("clientListing", JSON.stringify(result));
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    postData = (data) => {
        //POST FETCH HERE
        fetch(Constants.clientsAPI, {
          method: 'POST',
          body: JSON.stringify({
            firstName:data.first_name,
            lastName:data.last_name,
            driverLicense: data.licence_number,
            expiryDate: data.expiryDate,
            phoneNumber:data.phone,
          }),
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => {
            if (response.ok) {
                alert("Client added successfully")
                return response.json();
            } else {
                throw new Error("Check console for Errors");
            }
        })
        .then(json => {
            console.log("json", json)
            this.getData();
            this.clearFields();
        },
        (error) => {
          this.setState({
            error,
            isLogin: false
          });
          alert("Unable to save client details." + error)
        }).catch(function(error) {
            console.log(error);
        });
    }

    putData = (data) => {
        //POST FETCH HERE
        console.log(Constants.clientsAPI + "/" + data.driverLicense);
        fetch(Constants.clientsAPI + "/" + data.driverLicense, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(response => response.json())
        .then(json => {
          alert("Client updated successfully");
          this.getData();
          this.cancelUpdate()
        },
        (error) => {
          this.setState({
            error,
            isLogin: false
          });
          alert("Unable to save client details.")
        });
    }

    cancelUpdate = () => {
        this.setState({showEditPanel: false})
        this.state.uExpiryDate = '';
    }

    onDeleteClick = (item) => {
        fetch(Constants.clientsAPI + "/" + item.driver_license, {
              method: 'DELETE',
              headers: {
                "Content-type": "application/json"
              }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                this.getData();
            },
            (error) => {
              this.setState({
                error,
                isLogin: false
              });
              alert("Unable to save client details.")
            });
    }

    onClientListItemClick = (item) => {
        scrollToTop()
        this.setState({showEditPanel: true, eachElementData: item})    
    }

    clearFields = () => {
        document.getElementById("addForm").reset();
    }

    componentDidMount(){
        this.getData();
    }

    handleClientSubmit = (data) => {
        //POST CALL
        console.log("data", data);
        let fName = data.first_name
        let lName = data.last_name
        let phoneNum = data.phone
        let exDate = data.expiryDate
        let licNum = data.licence_number || ""

        console.log(data) // does'nt become nil
        if(fName.length == 0){
            alert(Constants.firstNameAlert);
        }
        else if(lName.length == 0){
            alert(Constants.lastNameAlert);
        }
        else if(licNum.length == 0){
            alert(Constants.licenseAlert);
        }
        else if(phoneNum.length == 0){
            alert(Constants.phoneAlert);
        }
        else if(exDate.length == 0){
            alert(Constants.expiryAlert);
        }
        else{
            this.postData(data);
        }
    }
    
    render() { 
        const listingClientSection = this.state.clientItems.map((elem, index) => {
            var dateObj = new Date(elem.expiry_date);
            var momentObj = moment(dateObj);
            var momentString = momentObj.format("DD/MM/YYYY");

            return (
                <ListGroup.Item key= {index}>
                    <p>
                        <b>Name: </b>{elem.first_name} {elem.last_name}  
                        <br/>
                        <b>Licence Number: </b>{elem.driver_license} <br/>
                        <b>Phone: </b>{elem.phone_number} <br/>
                        <b>License Expiration Date: </b> {momentString}
                        <br/>
                    </p>
                    <ButtonToolbar>
                        <Button variant="success" className="marginRight10" onClick={() => this.onClientListItemClick(elem)}>Edit</Button>
                        {/* <Button variant="danger" onClick={() => this.deletePopup(elem)}>Delete</Button> */}
                        <Popup
                            trigger={<button className="button"> Delete </button>}
                            modal>
                             {close => (
                            <div>
                                <div className="content">
                                {" "}
                                Are you sure?
                                </div>
                                <div className="actions">
                                
                                <button
                                    className="marginRight10"
                                    onClick={() => {
                                        this.onDeleteClick(elem)
                                        close();
                                    }}
                                >
                                    Yes
                                </button>
                                <button
                                    className="button"
                                    onClick={() => {
                                    console.log("modal closed ");
                                    close();
                                    }}
                                >
                                    No
                                </button>
                                </div>
                            </div>
                            )}
                        </Popup>
                    </ButtonToolbar>
                </ListGroup.Item>
            )}
        )

        return ( 
            <div>
                <Navigation/>
                <ClientForm handleSubmit = {this.handleClientSubmit}/>
                <Container>
                    <Row>
                        <Col>
                            {this.state.showEditPanel && <this.EditPanel elementData={this.state.eachElementData}/>}
                            <ListGroup>
                                {listingClientSection}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </div> 
        );
    }
}
 
export default ClientListing;