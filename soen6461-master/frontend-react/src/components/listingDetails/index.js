
import React, { Component } from 'react';

export default function Details(props) {
  const { selectedCar } = props;
  console.log(selectedCar);
    if(props.selectedCar != null) {
      return (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3>{selectedCar[0].make} {selectedCar[0].model}</h3>
                <hr />
              </div>
              {selectedCar[0].license_plate}
            </div>
          </div>
      );
    }
}