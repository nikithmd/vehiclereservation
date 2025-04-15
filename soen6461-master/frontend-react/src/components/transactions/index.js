import React, { Component } from 'react';
import '../../App.css';
import * as Constants from '../../constants'
import {Container, ListGroup, Row, Col, Button, ButtonToolbar} from "react-bootstrap";
import Navigation from '../navigation'
import TranFilterForm from './tranfilterform';
import moment from 'moment';

class TranListing extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            // clientData: this.props.clientList
            error: null,
            isLoaded: false,
            tranItems: [],
        }
    }
    componentDidMount(){
        this.getData();
    }
    
    
    handleTopFilter = (data) => {
        // const urlAppend = Constants.vehiclesAPI + "?"+"type="+dataArr[0]+"&make="+dataArr[1]+"&color="+dataArr[2]+"&year="+dataArr[3]
        // console.log(url);
        fetch(Constants.transfilAPI, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                tranItems: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    }

    getData = () => {
        fetch(Constants.transHisAPI)
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result)
                this.setState({
                    isLoaded: true,
                    tranItems: result
                });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    render() { 
        const tranItemsSection = this.state.tranItems.map((elem, index) => {
            var dateObj = new Date(elem.duedate);
            var momentObj = moment(dateObj);
            var momentString = momentObj.format("DD/MM/YYYY");


            dateObj = new Date(elem.startdate);
            momentObj = moment(dateObj);
            var momentStartString = momentObj.format("DD/MM/YYYY");


            dateObj = new Date(elem.timestamp);
            momentObj = moment(dateObj);
            var momenttimestamp = momentObj.format("DD/MM/YYYY HH:MM:SS");

            return (
                <ListGroup.Item key= {index}>
                        <b>Client: </b>{elem.first_name} {elem.last_name} <br/>
                        <b>Vehicle Licence Plate: </b>{elem.license_plate} <br/>
                        <b>Client Licence Number: </b>{elem.driver_license} <br/>
                        <b>Type: </b>{elem.type} <br/>
                        <b>Start Date: </b> {momentStartString}  <br/>
                        <b>Due Date: </b> {momentString} <br/>
                        <b>Timestamp: </b> {momenttimestamp}
                </ListGroup.Item>
            )}
        )
     return ( 
        <React.Fragment>

                <Navigation/>
                <TranFilterForm 
                    handleTopFilter={this.handleTopFilter}
                />
                {/* <TranListing handleSubmit = {handleClientSubmit}/> */}
                <Container>
                    <Row>
                        <Col>
                            <ListGroup>
                                {tranItemsSection}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

export default TranListing;