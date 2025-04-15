import React, { Component } from 'react';

import {Container, Row, Col, Form, Jumbotron, Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class ClientForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            first_name: '',
            last_name: '',
            licence_number: '',
            phone: '',
            expiryDate: ''
         }
    }
    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({[event.target.id] : event.target.value});
    }
    handleChangeDate = date => {
        this.setState({
            expiryDate: date
        });
     };

    handleSubmit = (event) => {
        //const filterValue = `${this.state.type} ${this.state.make} ${this.state.color} ${this.state.year}`
        //alert('Your Filters are: ' + filterValue);
        event.preventDefault();

        let dateObj = new Date(this.state.expiryDate);
        let momentObj = moment(dateObj);
        let momentString = momentObj.format('DD MMM YYYY');
        let newData = {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "licence_number": this.state.licence_number,
            "phone": this.state.phone,
            "expiryDate": momentString
        }
        console.log(newData)
        this.props.handleSubmit(newData);
        // document.getElementById("addForm").reset();
    }

    render() { 
        return ( 
            <Jumbotron>
                <Container>
                    <h3>
                        Add Client
                    </h3>
                    <Form onSubmit={this.handleSubmit} id="addForm" >
                        <Row>
                            <Col>
                                <Form.Group controlId="first_name">
                                    <Form.Label>Enter First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" onChange={this.handleChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="last_name">
                                    <Form.Label>Enter Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" onChange={this.handleChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="licence_number">
                                    <Form.Label>Enter Licence Number</Form.Label>
                                    <Form.Control type="text" placeholder="Licence Number" onChange={this.handleChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="phone">
                                    <Form.Label>Enter Phone Number</Form.Label>
                                    <Form.Control type="text" placeholder="Phone Number" onChange={this.handleChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="expiryDate">
                                    <Form.Label>Licence Expiration Date</Form.Label>
                                 {/* <Form.Control type="text" placeholder="Expiration Date" onChange={this.handleChange}/> */}
                                    <DatePicker
                                        selected={this.state.expiryDate}
                                        onChange={date => this.handleChangeDate(date)}
                                        minDate={new Date()}
                                        placeholderText="Select expiry date"
                                        dateFormat="dd/MM/yyyy"
                                    />   
                             </Form.Group>
                            </Col>
                        </Row>
                        <Button id = "submitBtn" variant="primary" type="submit" value="Submit">Add New</Button>
                    </Form>
                </Container>
            </Jumbotron>
        );
    }
}
 
export default ClientForm;