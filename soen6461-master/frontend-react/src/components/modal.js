import React, { useState } from 'react';
import {Container, Row, Col, Modal, Button, Form, Badge } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from 'moment';

function ModalReact(props) {
    const [show, setShow] = useState(props.show);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [reserveBtnActive, setReserveBtnActive] = useState(false);
    const [rentBtnActive, setRentBtnActive] = useState(false);

    const [finalReservedCarData, setFinalReservedCarData] = useState({});
    const [showSubmit, setShowSubmit] = useState(false);

    //setting clientList for client retreival
    let clientList = []
    if(localStorage.clientListing) {
      clientList = JSON.parse(localStorage.getItem("clientListing"));
    }

    const {selectedCarForModal} = props;
    const handleClose = () => props.handleClose();

    const handleReserve = () => {
      setReserveBtnActive(true);
      setRentBtnActive(false);
      setShowSubmit(true);

      let bodyDetail = getCarReserversatinDetails("Reserve");
      setFinalReservedCarData(bodyDetail)
    };

    const handleRent = () => {
      setRentBtnActive(true);
      setReserveBtnActive(false);
      setShowSubmit(true);

      let bodyDetail = getCarReserversatinDetails("Rent");
      setFinalReservedCarData(bodyDetail)
    };

    const getCarReserversatinDetails = (type) => {
      var e = document.getElementById("clientSelector");

      let strObj = moment(startDate);
      let endObj = moment(endDate);
      let startString = strObj.format('YYYY-MM-DD HH:mm');
      let endString = endObj.format('YYYY-MM-DD HH:mm');

      let details = { 
        driverLicense: clientList[e.selectedIndex].driver_license, 
        licensePlate: selectedCarForModal.license_plate, 
        dueDate: endString, 
        type: type, 
        startDate: startString,
        vehicleId: selectedCarForModal.id   
      }
      return details;
    }

    return (
      <>
        <Modal 
          size="lg" 
          show={show} 
          onHide={handleClose} 
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedCarForModal.make} - {selectedCarForModal.license_plate}    
              <Badge variant="success" className="marginLeft20">Available</Badge>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="show-grid">
                <Col xs={6} md={6}>
                  <label>Enter Start Date: </label>
                  <DatePicker
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      minDate={startDate}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="dd/MM/yyyy h:mm aa"
                  />
                </Col>

                <Col xs={6} md={6}>
                  <label>Enter End Date: </label>
                  <DatePicker
                    className="marginRight10"
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    minDate={new Date()}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="dd/MM/yyyy h:mm aa"
                  />
                </Col>
              </Row>
              <br/>
                <Row>
                  <Col xs={12} md={12}>
                      <Form.Label>Select Client</Form.Label>
                      <Form.Control as="select" id="clientSelector">
                        {clientList.map((e, index) => <option key={index}>{e.first_name} - Driver Licence: {e.driver_license}</option>)}
                      </Form.Control>
                  </Col>
                </Row>
              <br/>
              <Row>
                <Col>
                  <Button 
                    variant={reserveBtnActive ? 'primary marginRight10': "secondary marginRight10"}
                    size="sm"
                    onClick={handleReserve}
                  >
                    Reserve
                  </Button>
                  <Button
                   variant={rentBtnActive ? 'primary': "secondary"}  
                   size="sm"
                   onClick={handleRent}
                  >Rent</Button>
                </Col>
              </Row>
            </Container>

          </Modal.Body>
          {showSubmit &&
            <Modal.Footer>
              <Button variant="primary" onClick={() => props.handleReservationClick(finalReservedCarData)}>
                Submit
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          }

          <Modal.Footer className={"footer"}>
            <Button
              variant="primary"
              value={"previous"}
              onClick={(e) => props.getNextVehicleData(e, props.selectedCarForModal)}>
              Previous
            </Button>
            <Button
              variant="primary"
              value={"next"}
              onClick={(e) => props.getNextVehicleData(e, props.selectedCarForModal)}>
              Next
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ModalReact;