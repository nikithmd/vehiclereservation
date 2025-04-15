import React, { Component } from 'react';
import '../../App.css';
import * as Constants from '../../constants'
import moment from 'moment';
import {Container, Row, Col, CardDeck, ButtonGroup, Spinner, Form} from "react-bootstrap";
import FilterForm from "../filterForm";
import Navigation from '../navigation'
import ModalReact from '../modal';
import ReservedCarModal from '../reservedModal'
import RenderCarListing from './renderCarlisting'
import { withRouter } from "react-router";


function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

class VehicleListing extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            error: null,
            isLoaded: false,
            items: [],
            sortSelectValue: "A-Z",
            showCarDetails: true,
            availableItems: [],
            isAvailableItemLoaded: false,
            expiryDate: new Date(),
            showModal: false,
            selectedCarForModal: {},
            showReservedModal: false,
            showReservedCar: {},
            selectedSorter : ''
        }
    }

    componentDidMount() {
        fetch(Constants.vehiclesAPI)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
              localStorage.setItem("carListing", JSON.stringify(result));
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
          this.getData();
    }

    getData = () => {
        fetch(Constants.clientsAPI)
        .then(res => res.json())
        .then(
          (result) => {
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

    handleSort = (event) => {

        const selectedVal = event.target.value;

        const sortedDataByAlphabets = this.state.items.sort(function(a, b){
            var license_plate_a = a.license_plate.toLowerCase(), license_plate_b = b.license_plate.toLowerCase();
            if(license_plate_a < license_plate_b) { return -1; }
            if(license_plate_a > license_plate_a) { return 1; }
            return 0;
        })

        const sortedDataByYear = this.state.items.sort(function(a, b){
            var year_a = a.year, year_b = b.year;
            if(year_a < year_b) { return -1; }
            if(year_a > year_b) { return 1; }
            return 0;
        })

        let result = sortedDataByAlphabets;
        let sortDic = {}
        switch(selectedVal) {
            case "type":
                this.state.selectedSorter = "sortType"
                break;
            case "make":
                this.state.selectedSorter = "sortMake"
                break;
            case "model":
                this.state.selectedSorter = "sortModel"
                break;
            case "year":
                this.state.selectedSorter = "sortYear"
                break;
            case "color":
                this.state.selectedSorter = "sortColor"
                break;
            case "licensePlate":
                this.state.selectedSorter = "sortLp"
                break;
            // case "a-z":
            //     result = sortedDataByAlphabets.reverse();
            //   break;
            // case "z-a":
            //     result = sortedDataByAlphabets;
            //   break;
            case "asc":
                sortDic[this.state.selectedSorter] = "ASC"
                result = sortedDataByYear;
              break;
            case "desc":
                sortDic[this.state.selectedSorter] = "DESC"
                result = sortedDataByYear.reverse();
                break;
            default:
                result = sortedDataByAlphabets
          }

          if(!isEmpty(sortDic)){
            this.handleTopFilter(sortDic)
          }
        // this.setState({
        //     items: result
        // })
    }

    
    handleClose = () => {
        this.setState({
            showModal: false
        });
    };

    handleReservationClick = (data) => {
        this.bookVehicleAPI(data)
    }

    /******* RESERVATION HANDLES */
    handleRervedModalClose = () => {
        this.setState({
            showReservedModal: false
        });
    };

    handleReservationCancelClick = (data) => {
        this.cancelReservationAPI(data.id);
    }

    handleStartRentClick = (data) => {
        data.type = "Rent";
        //POST FETCH HERE
        this.updateStatus(data);
    }

    handleReturnRentCarClick = (data) => {
        data.type = "Return"
        this.updateStatus(data);
    }

    bookVehicleAPI = (data) =>{
        data.dueDate = data.duedate || data.dueDate
        data.startDate = data.startdate || data.startDate
        fetch(Constants.bookAPI, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json",
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': 0
            }
          })
          .then(response => {
            if (response.ok) {
                this.setState({showModal: false})
                return response.json();
              } else {
                throw response.text();
              }
          })
          .then(json => {
              alert("Vehicle transaction created successfully.")
          },
          (error) => {
              error.then((message) => {
                this.setState({
                    error: message,
                  });
                  alert(message)
              })
            
          });
    }

    updateStatus = (data) => {
        let url = Constants.bookAPI + "/" + data.id
        data.dueDate = data.duedate || data.dueDate
        data.startDate = data.startdate || data.startDate

        fetch((url), {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
            "Content-type": "application/json",
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
            }
        })
        .then(response => {
            if (response.ok) {
                this.setState({showReservedModal: false})
                return response.json();
            } else {
                throw new Error('Something went wrong, Check console');
            }
        })
        .then(json => {
            alert("Vehicle returned successfully");
        },
        (error) => {
            this.setState({
                error,
            });
            alert("Unable to return vehicle.")
        });
    }

    cancelReservationAPI = (tranID) =>{
        let url = Constants.bookAPI + "/" + tranID
        fetch((url), {
            method: 'DELETE',
            headers: {
            "Content-type": "application/json",
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
            }
        })
        .then(response => {
            if (response.ok) {
                this.setState({showReservedModal: false})
                return response.json();
            } else {
                throw new Error('Something went wrong, Check console');
            }
        })
        .then(json => {
            alert("Vehicle reservation cancelled successfully");
        },
        (error) => {
            this.setState({
                error,
            });
            alert("Unable to cancel booking." + error)
        });
    }


    checkVehicleAvailability = (elem) => {
        let urlStr = encodeURIComponent(elem.license_plate.trim())

        let momentObj = moment(this.state.expiryDate);
        let momentString = momentObj.format('YYYY-MM-DD HH:mm:ss');
        const fetchUrl = Constants.vehicleAvailablityAPI+ urlStr + "/isavailable?today=" + encodeURIComponent(momentString);
        
        fetch(fetchUrl , { 
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': 0
              }
        })
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result)
            this.setState({
                isAvailableItemLoaded: true,
                availableItems: result
            });

            if(this.state.availableItems.length == 0) {
                this.setState({
                    showModal: true,
                    selectedCarForModal: elem,
                    showReservedModal: false
            });
            } else {
                this.setState({
                    showReservedModal: true,
                    showModal: false,
                    showReservedCar: this.state.availableItems[0]
                })
            }
          },
          (error) => {
            this.setState({
                isAvailableItemLoaded: true,
                error
            });
          }
        )
    }

    getNextVehicleData = (e, elem) => {

        let len = this.state.items.length;
        var currElemIndex = elem.id - 1; //
        
        if(elem.hasOwnProperty('cancelled')){
            currElemIndex = elem.vehicle_id - 1;
        }

        let selectedItemNew = null;

        if (e.target.value === "previous") {
            selectedItemNew = this.state.items[(currElemIndex + len - 1) % len];
        } else {
            selectedItemNew = this.state.items[(currElemIndex + 1) % len];
        }
        
        this.checkVehicleAvailability(selectedItemNew)

    }
    


    handleTopFilter = (data) => {
        // const urlAppend = Constants.vehiclesAPI + "?"+"type="+dataArr[0]+"&make="+dataArr[1]+"&color="+dataArr[2]+"&year="+dataArr[3]
        fetch(Constants.vehiclesFilterAPI, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
          }
        })
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
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

    handleChangeDate = date => {
        this.setState({
            expiryDate: date
        });
    };

    render(){
        const { error, isLoaded, items } = this.state;

        const listingSection = items.map((elem, index) => {
            return (
                <Col md={4} sm={2} lg={4} className="eachcol" key={index}>
                    <RenderCarListing
                        elem = {elem} 
                        checkCarAvailability={this.checkVehicleAvailability}
                        handleChangeDate = {this.handleChangeDate}
                        date= {this.state.expiryDate}
                    />
                </Col>
            )}
        )
        return (
            <React.Fragment>
                <Navigation />
                <FilterForm 
                    handleTopFilter={this.handleTopFilter}
                />
                {this.state.showModal && <ModalReact 
                    selectedCarForModal = {this.state.selectedCarForModal}
                    show={this.state.showModal} 
                    handleClose={this.handleClose}
                    handleReservationClick={this.handleReservationClick}
                    getNextVehicleData = {this.getNextVehicleData}
                 />}

                {this.state.showReservedModal && 
                    <ReservedCarModal 
                        show={this.state.showReservedModal}
                        handleClose={this.handleRervedModalClose}
                        showReservedCar = {this.state.showReservedCar}
                        handleReservationCancelClick = {this.handleReservationCancelClick}
                        handleStartRentClick = {this.handleStartRentClick}
                        handleReturnRentCarClick={this.handleReturnRentCarClick}
                        getNextVehicleData = {this.getNextVehicleData}
                        />}
                <Container>
                    <Form>
                        <Form.Group as={Row}
                            onChange={this.handleSort}
                            value ={this.state.sortSelectValue}
                        >
                            <Form.Label column md="1">Sort By:</Form.Label>
                            <Col md="2">
                                <Form.Control as="select">
                                    <option value="c">Choose</option>
                                    <option value="licensePlate">License Plate</option>
                                    <option value="color">Color</option>
                                    <option value="make">Make</option>
                                    <option value="model">Model</option>
                                    <option value="type">Type</option>
                                    <option value="year">Year</option>
                                </Form.Control>
                            </Col>
                            <Col md="2">
                                <Form.Control as="select">
                                    <option value="c">Choose</option>
                                    {/* <option value="a-z">A-Z</option> */}
                                    {/* <option value="z-a">Z-A</option> */}
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Form>
                        <br/>
                    <Row>
                        {error && <div>Error: {error.message}</div>}
                        {!isLoaded && <Spinner animation="border" />}
                        {isLoaded && 
                            <CardDeck>
                                {listingSection}
                            </CardDeck>
                        }
                    </Row>
                </Container>
            </React.Fragment>
        );

    }
}

export default withRouter(VehicleListing);