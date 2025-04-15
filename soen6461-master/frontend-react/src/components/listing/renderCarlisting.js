import React from 'react';

import DatePicker from "react-datepicker";
import Popup from "reactjs-popup";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

import carImage from '../../assests/images/carImage.jpg';

const CustomButton = React.forwardRef(({ open, ...props }, ref) => {
    const type = Boolean(parseInt(localStorage.getItem('type'), 10));
    if (type) {
        return (
            <Button variant="primary" className="button" ref={ref} {...props}>
              View Details
            </Button>
        )
    } else {
        return;
    }
    
});

export default function RenderCarListing({elem = {}, checkCarAvailability, handleChangeDate, date}) {
    var startDate = date;
    return(
        <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src={carImage} />
            <Card.Body>
                <Card.Title>{elem.type} - {elem.license_plate}</Card.Title>
                <Card.Text>
                    {/* Some quick example text to build on the card title and make up the bulk of */}
                    {/* the card's content. */}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem><b>Make:</b> {elem.make}</ListGroupItem>
                <ListGroupItem><b>Model:</b> {elem.model}</ListGroupItem>
                <ListGroupItem><b>Year:</b> {elem.year}</ListGroupItem>
                <ListGroupItem><b>Color:</b> {elem.color}</ListGroupItem>   
            </ListGroup>
            <Card.Body>
                {/* <Button variant="primary" onClick = {()=> checkCarAvailabily(elem.license_plate)}>View Details</Button> */}
                <Popup
                    trigger={open => <CustomButton open={open}/>}
                    position="top center"
                    //closeOnDocumentClick
                    on="hover"
                >
                    <div className="tool_tip">
                        <DatePicker
                            className="marginRight10"
                            selected={startDate}
                            onChange={date => handleChangeDate(date)} 
                            minDate={new Date()}
                            placeholderText = ""
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time" 
                            dateFormat="dd/MM/yyyy h:mm aa"
                        />
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => checkCarAvailability(elem)}
                            >Ok</Button>
                    </div>
                </Popup>
            </Card.Body>
        </Card>
    )
}