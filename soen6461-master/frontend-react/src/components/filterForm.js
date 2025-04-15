import React, { Component } from 'react';
import {Container, Row, Col, Form, Jumbotron, Button} from "react-bootstrap";
import * as Constants from '../constants'

class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            type: '',
            make: '',
            color: '',
            year: '',
            typeList: [],
            colorList: [],
            makeList: [],
            yearList:[]
         }
    }
    
    
    componentDidMount() {
        this.getFiltersData("type")
        this.getFiltersData("color")
        this.getFiltersData("make")
        this.getFiltersData("year")
    }


    getFiltersData = (filter) => {
        fetch(Constants.carFiltersAPI+filter)
        .then(res => res.json())
        .then(
          (result) => {
            if (filter === 'type') {
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
            else if(filter === 'year'){
                this.setState({
                    yearList:result
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

    handleSubmit = (event) => {
        // const filterValue = `${this.state.type} ${this.state.make} ${this.state.color} ${this.state.year}`
        // alert('Your Filters are: ' + filterValue);

        if(this.state.type == "Select"){this.state.type = ''}
        if(this.state.color == "Select"){this.state.color = ''}
        if(this.state.year == "Select"){this.state.year = ''}
        if(this.state.make == "Select"){this.state.make = ''}
        let newData = {
            "type": this.state.type,
            "make": this.state.make,
            "color": this.state.color,
            "year": this.state.year,
        }
        this.props.handleTopFilter(newData);
        event.preventDefault();
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
                        Filters
                    </h3>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group onSubmit={this.mySubmitHandler} controlId="type">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control as="select" value={this.state.type} onChange={this.handleChange}>
                                        <option>Select</option>
                                        {typeList.map((e, index) => <option key={index}>{e}</option>)}
                                        {/* <option>SUV</option>
                                        <option>SEDAN</option>
                                        <option>MINI</option> */}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="color">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control as="select" value={this.state.color} onChange={this.handleChange}>
                                        {/* <option>Select</option>
                                        <option>BLACK</option>
                                        <option>BLUE</option>
                                        <option>Silver</option> */}
                                         <option>Select</option>
                                         {colorList.map((e, index) => <option key={index}>{e}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="make">
                                    <Form.Label>Make</Form.Label>
                                    <Form.Control as="select" value={this.state.make} onChange={this.handleChange}>
                                        <option>Select</option>
                                        {makeList.map((e, index) => <option key={index}>{e}</option>)}
                                        {/* <option>Mazda</option>
                                        <option>BMW</option>
                                        <option>Ford</option>
                                        <option>Cadillac</option>
                                        <option>Nissan</option> */}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="year">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control as="select" value={this.state.year} onChange={this.handleChange}>
                                        <option>Select</option>
                                        {yearList.map((e, index) => <option key={index}>{e}</option>)}
                                        {/* <option>2017</option>
                                        <option>2018</option>
                                        <option>2019</option> */}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit" value="Submit">Set Filters</Button>
                        
                    </Form>
                </Container>
            </Jumbotron>
        );
    }
}
 
export default FilterForm;