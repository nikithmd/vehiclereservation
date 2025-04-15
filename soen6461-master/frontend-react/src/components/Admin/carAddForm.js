import React, { Component } from 'react';
import * as Constants from '../../constants'
import {Container, Row, Col, Form, Jumbotron, Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

let typeList = []
let colorList = []
let makeList = []
let yearList = []

class CarAdminForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            type: '',
            make: '',
            model: '',
            licensePlate: '',
            year: '',
            color: '',
            typeList :[],
            colorList : [],
            makeList : [],
        }
        const currentYear = (new Date()).getFullYear();
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
        this.yearList = range(currentYear, currentYear - 25, -1);
    }
    componentDidMount() {
        this.getFiltersData("type")
        this.getFiltersData("color")
        this.getFiltersData("make")
    }

    getFiltersData = (filter) => {
        fetch(Constants.carFiltersAPI+filter)
        .then(res => res.json())
        .then(
          (result) => {
            if(filter === 'type'){
                this.setState({
                    typeList:result
            })           
             }
            else if(filter === 'color'){
                this.setState({
                    colorList:result
            })           
             }
            else if(filter === 'make'){
                this.setState({
                    makeList:result
            })          
          }
          },
          (error) => {
            console.log(error)
          }
        )
    }


    handleChange = (event) => {
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
        let newData = {
            "licensePlate": this.state.licensePlate,
            "make": this.state.make,
            "model": this.state.model,
            "year": this.state.year,
            "color": this.state.color,
            "type": this.state.type,
        }
        this.props.handleSubmit(newData);
        // document.getElementById("addForm").reset();

    }

    render() { 
        const {
            typeList,
            colorList,
            makeList,
            yearList
        } = this.state
        return ( 
            <Jumbotron>
                <Container>
                    <h3>
                        Add Vehicle
                    </h3>
                    <Form onSubmit={this.handleSubmit} id="addVehicleForm" >
                        <Row>
                        <Col>
                                <Form.Group controlId="licensePlate">
                                    <Form.Label>Licence Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Licence Number" onChange={this.handleChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group onSubmit={this.mySubmitHandler} controlId="type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" value={this.state.type} onChange={this.handleChange}>
                                         <option>Select</option>
                                        {typeList.map((e, index) => <option key={index}>{e}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group controlId="color">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control as="select" value={this.state.color} onChange={this.handleChange}>
                                        <option>Select</option>
                                         {colorList.map((e, index) => <option key={index}>{e}</option>)}
                                    </Form.Control>
                            </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="model">
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Model" onChange={this.handleChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                            <Form.Group controlId="make">
                                    <Form.Label>Make</Form.Label>
                                    <Form.Control as="select" value={this.state.make} onChange={this.handleChange}>
                                        <option>Select</option>
                                         {makeList.map((e, index) => <option key={index}>{e}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="year">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control as="select" value={this.state.year} onChange={this.handleChange}>
                                        <option>Select</option>
                                        {this.yearList.map((e, index) => <option key={index}>{e}</option>)}
                                    </Form.Control>
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
 
export default CarAdminForm;