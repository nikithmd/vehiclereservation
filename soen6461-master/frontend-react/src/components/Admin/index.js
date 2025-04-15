import React, { Component } from "react";
import "../../App.css";
import * as Constants from "../../constants"
import { Container, ListGroup, Button, ButtonToolbar, Row, Col, Form } from "react-bootstrap";
import Navigation from "../navigation"
import CarAdminForm from "./carAddForm";
import Popup from "reactjs-popup";

const scrollToTop = () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

//setting clientList for client retreival
let yearList = []

class AdminCarListing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// clientData: this.props.clientList
			error: null,
			isLoaded: false,
			carItems: [],
			showEditPanel: false,
			eachElementData: null,
		}
	}

	componentDidMount() {
		const currentYear = (new Date()).getFullYear();
		const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
		yearList = range(currentYear, currentYear - 25, -1)
		this.getData();
	}


	getData = () => {
		fetch(Constants.vehiclesAPI)
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result)
					this.setState({
						isLoaded: true,
						carItems: result
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
	postData = (data) => {
		//POST FETCH HERE
		fetch(Constants.addVehicleAPI, {
			method: "POST",
			body: JSON.stringify({
				licensePlate: data.licensePlate,
				type: data.type,
				make: data.make,
				model: data.model,
				year: data.year,
				color: data.color,
			}),
			headers: {
				"Content-type": "application/json"
			}
		})
			.then(response => {
				if (response.ok) {
					alert("Vehicle added successfully")
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
				}).catch(function (error) {
			console.log(error);
		});
	}

	clearFields = () => {
		document.getElementById("addVehicleForm").reset();
	}

	onClientListItemClick = (item) => {
		scrollToTop()
		this.setState({ showEditPanel: true, eachElementData: item })
	}

	cancelUpdate = () => {
		this.setState({ showEditPanel: false })
	}

	EditPanel = ({ elementData }) => {
		console.log(elementData)
		return (
			<Container>
				<Row className="justify-content-md-center mt-5">
					<Form className="widht100 formDesign" onSubmit={ this.handleSubmit }>
						<Form.Group as={ Row } controlId="uniqueLPNum">
							<Form.Label column sm="2">
								Licence Number
							</Form.Label>
							<Col sm="10">
								<Form.Control plaintext readOnly defaultValue={ elementData.license_plate }/>
							</Col>
						</Form.Group>
						<Form.Group as={ Row } controlId="uType">
							<Form.Label column sm="2">
								Type
							</Form.Label>
							<Col sm="10">
								<Form.Control defaultValue={ elementData.type }/>
							</Col>
						</Form.Group>
						<Form.Group as={ Row } controlId="ucolor">
							<Form.Label column sm="2">
								Color
							</Form.Label>
							<Col sm="10">
								<Form.Control defaultValue={ elementData.color }/>
							</Col>
						</Form.Group>
						<Form.Group as={ Row } controlId="umodel">
							<Form.Label column sm="2">
								Model
							</Form.Label>
							<Col sm="10">
								<Form.Control defaultValue={ elementData.model }/>
							</Col>
						</Form.Group>
						<Form.Group as={ Row } controlId="umake">
							<Form.Label column sm="2">
								Make
							</Form.Label>
							<Col sm="10">
								<Form.Control defaultValue={ elementData.make }/>
							</Col>
						</Form.Group>

						<Form.Group as={ Row } controlId="uyear">
							<Form.Label column sm="2">
								Year
							</Form.Label>
							<Col sm="10">
								<Form.Control defaultValue={ elementData.year } as="select" value={ this.state.year }
											  onChange={ this.handleChange }>
									<option>Select</option>
									{ yearList.map((e, index) => <option key={ index }>{ e }</option>) }
								</Form.Control>
							</Col>

						</Form.Group>

						{/* <ButtonToolbar>
                        <Button variant="primary" className="marginRight10" type="submit" value="Submit">Update</Button>
                        <Button variant="danger" onClick={this.setState({showEditPanel: false})}>Cancel</Button>
                        </ButtonToolbar> */ }
						<Button variant="primary" className="marginRight10" type="submit" value="Submit">
							Update
						</Button>
					</Form>
					<Button variant="danger" type="cancel" onClick={ () => this.cancelUpdate() }>
						Cancel
					</Button>
				</Row>
				<br/>
			</Container>
		)
	}

	handleSubmit = (event) => {
		const unilicNum = document.querySelector("#uniqueLPNum").value;
		const updatedtype = document.querySelector("#uType").value;
		const updatedMake = document.querySelector("#umake").value;
		const updatedColor = document.querySelector("#ucolor").value;
		const updatedYear = document.querySelector("#uyear").value;
		const updatedModel = document.querySelector("#umodel").value;

		let body = {
			licensePlate: unilicNum,
			type: updatedtype,
			make: updatedMake,
			model: updatedModel,
			year: updatedYear,
			color: updatedColor,
		};
		//PUT CALL - after RESPONSE
		this.putData(body)
		event.preventDefault();
	}
	putData = (data) => {
		//PUT FETCH HERE
		console.log(data)
		console.log(Constants.addVehicleAPI + "/" + this.state.eachElementData.id);
		fetch(Constants.addVehicleAPI + "/" + this.state.eachElementData.id, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json"
			}
		})
			.then(response => response.json())
			.then(json => {
					console.log(json)
					alert("Vehicle updated successfully");
					this.getData();
					this.cancelUpdate()
				},
				(error) => {
					this.setState({
						error,
						isLogin: false
					});
					alert("Unable to update vehicle details.")
				});
	}

	onDeleteClick = (item) => {
		fetch(Constants.addVehicleAPI + "/" + item.id, {
			method: "DELETE",
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

	handleVehicleSubmit = (data) => {
		//POST CALL
		console.log("data", data);
		let licensePlate = data.licensePlate;
		let type = data.type;
		let make = data.make;
		let model = data.model;
		let year = data.year;
		let color = data.color;

		if (licensePlate.length == 0) {
			alert(Constants.licenseAlert);
		} else if (type.length == 0) {
			alert(Constants.typeAlert);
		} else if (color.length == 0) {
			alert(Constants.colorAlert);
		} else if (model.length == 0) {
			alert(Constants.modelAlert);
		} else if (make.length == 0) {
			alert(Constants.makeAlert);
		} else if (year.length == 0) {
			alert(Constants.yearAlert);
		} else {
			this.postData(data);
		}
	}

	render() {
		let momentString = "DD/MM/YYYY";

		const carAdminSection = this.state.carItems.map((elem, index) => {
				return (

					<ListGroup.Item key={ index }>
						<p>
							<b>Licence Number: </b>{ elem.license_plate } <br/>
							<b>Make: </b>{ elem.make } <br/>
							<b>Model: </b> { elem.model } <br/>
							<b>Type: </b> { elem.type } <br/>
							<b>Color: </b> { elem.color } <br/>
							<b>Year: </b> { elem.year } <br/>
						</p>
						<ButtonToolbar>
							<Button variant="success" className="marginRight10"
									onClick={ () => this.onClientListItemClick(elem) }>Edit</Button>
							{/* <Button variant="danger" onClick={() => this.deletePopup(elem)}>Delete</Button> */ }
							<Popup
								trigger={ <button className="button"> Delete </button> }
								modal>
								{ close => (
									<div>
										<div className="content">
											{ " " }
											Are you sure?
										</div>
										<div className="actions">

											<button
												className="marginRight10"
												onClick={ () => {
													this.onDeleteClick(elem)
													close();
												} }
											>
												Yes
											</button>
											<button
												className="button"
												onClick={ () => {
													console.log("modal closed");
													close();
												} }
											>
												No
											</button>
										</div>
									</div>
								) }
							</Popup>
						</ButtonToolbar>
					</ListGroup.Item>

				)
			}
		)
		return (
			<div>
				<Navigation/>
				<CarAdminForm handleSubmit={ this.handleVehicleSubmit }/>
				<Container>
					<Row>
						<Col>
							{ this.state.showEditPanel && <this.EditPanel elementData={ this.state.eachElementData }/> }
							<ListGroup>
								{ carAdminSection }
							</ListGroup>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

export default AdminCarListing;