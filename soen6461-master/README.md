# Vehicle Reservation System

## Overview of the system
Consider a company that rents out vehicles. Your assignment is to develop a web application that can handle the operations. A database holds records of vehicles and records of its clients as follows:
1. A record for a vehicle contains a type (sedan, SUV, truck), make, model, year, color, and license plate number (unique alphanumeric in the format ABC 123). Only the licence plate number is unique. An example record is shown below:

     Type:           SUV <br />
     Make:           Jeep <br />
     Model:          Wrangler <br />
     Year:           2019 <br />
     Color:          Black <br />
     Licence plate:  XCB 468 <br />

2. A client record consists of a first and last name, driver's license (unique alphanumeric, in the format A-1234-123456-12) along with its expiration date, and a phone number. Only the driver's license is unique.

## TODO

Your software system will consist of the following artifacts that must be developed in line with an iterative process:
1. A Software Requirements Specification
2. A Software Architecture Document
3. Code repository (contains application code, as well as testing, configuration, installation, and other supporting implementation)
4. A running version to be demonstrated in class.

### Setting up environment

## Prerequisites
- Node.js (v14.0 or higher)
- MySQL (v8.0 or higher)
- Git

## 1. Database Setup
#### Login to MySQL
mysql -u root -p

##### Create database
Please refer this for setup: https://github.com/nikithmd/vehiclereservation/blob/main/soen6461-master/carrentalsystem.sql

## 2. Backend Setup

##### Install dependencies
npm install

##### Create and configure .env file
touch .env

##### Add the following configuration to .env:
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=vehicle_rental
PORT=3000
JWT_SECRET=your_secret_key

##### Start backend server
npm start

## 3. Frontend Setup

##### Install dependencies
npm install

##### Create and configure .env
touch .env

##### Add following configuration to .env:
REACT_APP_API_URL=http://localhost:3000

##### Start frontend application
npm start

#### Credentials
- Clerk <br/>
To log in to the clerk account, please use the following account credentials:  <br/>
```Username: mdnikith``` <br />
```Password: password```

- Admin <br/>
To log in to the admin account, please use the following account credentials:  <br/>
```Username: admin``` <br />
```Password: password```

### Screenshots for various Screens
- Login Page <br/>
![Login Screen](/soen6461-master/Screenshots/1_login.png)

- Vehicles Catalog for Selection and Filter <br/>
![Vehicle selection and filter](/soen6461-master/Screenshots/2_vehicle_catalogue.png)

- Client Details <br/>
![Client details](/soen6461-master/Screenshots/3_client_manage.png)

- Edit Client Detail Page <br/>
![Single Client](/soen6461-master/Screenshots/6_edit_client.png)

- Vehicle Status and details <br/>
![Vehicle Status](/soen6461-master/Screenshots/5_reserve_rent_popup.png)

- Renting a Vehicle <br/>
![Renting](/soen6461-master/Screenshots/7_cancel_rent.png)

- Returning a Vehicle <br/>
![Returning](/soen6461-master/Screenshots/11_rent_Start.png)

- Adding a vehicle <br/>
![Adding](/soen6461-master/Screenshots/9_addVehicle.png)

- Editing a vehicle <br/>
![Editing](/soen6461-master/Screenshots/8_edit_vehicle.jpeg)

- Filtering transactions <br/>
![filter-type-a](/soen6461-master/Screenshots/10_transaction.png)


## Author

Nikith Bhee Mohammed
