import React, { useState } from 'react';
import {Container, Row, Col, Modal, Button, ButtonToolbar, Badge } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from 'moment';

function ReservedCarModal(props) {

    const [show, setShow] = useState(props.show);
    const [showSubmit, setShowSubmit] = useState(false);

    const handleClose = () => props.handleClose();
    const {showReservedCar} = props;
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
            <Modal.Title> {showReservedCar.driver_license} - {showReservedCar.type}
              <Badge variant="danger" className="marginLeft20">Not Available</Badge>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="show-grid">
                <Col >
                  <label>Please select </label>
                    {showReservedCar.type === "Reserve" &&
                        <ButtonToolbar>
                            <Button 
                                variant="danger marginRight10"
                                onClick = {() =>props.handleReservationCancelClick(showReservedCar)}
                            >Cancel Reservation</Button>
                            <Button 
                                variant="primary" 
                                onClick = {() => props.handleStartRentClick(showReservedCar)}
                            >Start Renting</Button>
                        </ButtonToolbar>
                    }
                    
                    {showReservedCar.type === "Rent" &&
                        <ButtonToolbar>
                            <Button 
                                variant="danger marginRight10"
                                onClick = {() =>props.handleReturnRentCarClick(showReservedCar)}
                            >Return Vehicle</Button>
                        </ButtonToolbar>
                    }
                  
                </Col>

              </Row>
              <br/>
            </Container>

          </Modal.Body>
          {
            showSubmit &&
            <Modal.Footer>
              {/* <Button variant="primary" onClick={() => props.handleReservationClick(finalReservedCarData)}>
                Submit
              </Button> */}
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          }
          <Modal.Footer className={"footer"}>
            <Button
              variant="primary"
              value={"previous"}
              onClick={(e) => props.getNextVehicleData(e, props.showReservedCar)}>
              Previous
            </Button>
            <Button
              variant="primary"
              value={"next"}
              onClick={(e) => props.getNextVehicleData(e, props.showReservedCar)}>
              Next
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}
export default ReservedCarModal;