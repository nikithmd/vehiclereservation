import React, { Component } from 'react';
import {Container, Row, Col, Form, Jumbotron, Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from 'moment';

//setting clientList for client retreival
let clientList = []
if(localStorage.clientListing) {
     clientList = JSON.parse(localStorage.getItem("clientListing"));
}
let carList = []
if(localStorage.carListing) {
    carList = JSON.parse(localStorage.getItem("carListing"));
}
class TranFilterForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            client: '',
            car: '',
            type: '',
            date: '',
         }
    }
    handleChange = (event) => {
        this.setState({[event.target.id] : event.target.value});
    }

    handleChangeDate = date => {
        this.setState({
            date: date
        });
     };
    handleSubmit = (event) => {
        // const filterValue = `${this.state.type} ${this.state.make} ${this.state.color} ${this.state.year}`
        // alert('Your Filters are: ' + filterValue);
        
        if(this.state.client == "Select"){this.state.client = ''}
        if(this.state.car == "Select"){this.state.car = ''}
        if(this.state.type == "Select"){this.state.type = ''}
        
        var e = document.getElementById("car");
        var c = document.getElementById("client");
        var cDriverLicene = ""
        var carPlate = ""
        if(e.selectedIndex > 0){
            carPlate = carList[e.selectedIndex - 1].license_plate;
        }
        if(c.selectedIndex > 0){
            cDriverLicene = clientList[c.selectedIndex - 1].driver_license
        }


        var dateObj = new Date(this.state.date);
        var momentObj = moment(dateObj);
        var momentString = momentObj.format("YYYY-MM-DD");
        if(this.state.date == ""){momentString = ''}

        let newData = {
            "licensePlate": carPlate,
            "driverLicense": cDriverLicene,
            "dueDate": momentString,
            "type": this.state.type,
        }
        this.props.handleTopFilter(newData);
        event.preventDefault();
    }

    

    render() { 
        const onClearClick = () => {
            document.getElementById("tranForm").reset();
            this.state.date = ''

            let d = {
                "licensePlate": '',
                "driverLicense": '',
                "dueDate": '',
            }
            this.props.handleTopFilter(d);
            // event.preventDefault();
        }

        return ( 
            <Jumbotron>
                <Container>
                    <h3>
                        Filters
                    </h3>
                    <Form onSubmit={this.handleSubmit} id="tranForm">
                        <Row>
                                <Col>
                                    <Form.Group onSubmit={this.mySubmitHandler} controlId="client">
                                        <Form.Label>Client</Form.Label>
                                        <Form.Control as="select" controlid="client" onChange={this.handleChange}>
                                            <option>Select</option>
                                            {clientList.map((e, index) => <option key={index}>{e.first_name} - Driver Licence: {e.driver_license}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group controlId="car">
                                    <Form.Label>Vehicle</Form.Label>
                                    <Form.Control as="select"  onChange={this.handleChange}>
                                        <option>Select</option>
                                        {carList.map((e, index) => <option key={index}>{e.type} - {e.license_plate}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" onChange={this.handleChange}>
                                    <option>Select</option>
                                    <option>Rent</option>
                                    <option>Reserve</option>
                                    <option>Return</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlid="date">
                                    <Form.Label>Due Date</Form.Label> 
                                    <br/>
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={date => this.handleChangeDate(date)}
                                        placeholderText="Select date"
                                        dateFormat="dd/MM/yyyy"
                                    />   
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" className = "marginRight10" type="submit" value="Submit">Set Filters</Button>
                        <Button variant="danger" onClick={() => onClearClick()}>Clear Filters</Button>

                    </Form>
                </Container>
            </Jumbotron>
        );
    }
}
 
export default TranFilterForm;