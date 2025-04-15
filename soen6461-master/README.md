# Vehicle Reservation System
Project for Course 6461

Project Requirement Document - https://users.encs.concordia.ca/~cc/soen6461/project/description.pdf

## Overview of the system
Consider a company that rents out vehicles. Your assignment is to develop a web application to handle the operations. A database holds records of vehicles and records of its clients as follows:
1. A record for a vehicle contains a type (sedan, SUV, truck), make, model, year, color, and licence plate number (unique alphanumeric in the format ABC 123). Only the licence plate number is unique. An example record is shown below:

     Type:           SUV <br />
     Make:           Jeep <br />
     Model:          Wrangler <br />
     Year:           2019 <br />
     Color:          Black <br />
     Licence plate:  XCB 468 <br />

2. A client record consists of a first and last name, driver licence (unique alphanumeric, in the format A-1234-123456-12) together with its expiration date, and a phone number. Only the driver licence is unique.


## TODO

Your software system will consist of the following artifacts that must be developed in line with an iterative process:
1. A Software Requirements Specification (template available on course website), 5 of 9
2. A Software Architecture Document (template available on course website),
3. Code repository (contains application code, as well as testing, configuration, installation and other supporting implementation), 
and finally
4. A running version to be demonstrated in class.

### Setting up environment

1. Setting up the database systems on MySQL (https://github.com/ShareenAli/soen6461/wiki/Importing-Database)
2. Setting up the backend server on Node.js (https://github.com/ShareenAli/soen6461/wiki/API-Requests)
3. Running up the frontend web application (https://github.com/ShareenAli/soen6461/wiki/Frontend-react-Guide)

### Testing the Environment
1. Please go to this page: (https://github.com/ShareenAli/soen6461/wiki/Unit-Testing--backend-and-frontend)


### Credentials
- Clerk <br/>
To login into clerk account please use the following account credentials:  <br/>
```Username: djmunish``` <br />
```Password: password```

- Admin 1 <br/>
To login into admin account please use the following account credentials:  <br/>
```Username: admin``` <br />
```Password: password```
- Admin 2 ```(to test one admin at a time functionality)```<br/>
To login into admin account please use the following account credentials:  <br/>
```Username: sukesh``` <br />
```Password: password``` 

### Screenshots for various Screens
- Login Page <br/>
![Login Screen](/Screenshots/1_login.png)

- Vehicles Catalog for Selection and Filter <br/>
![Vehicle selection and filter](/Screenshots/2_vehicle_catalogue.png)

- Client Details <br/>
![Client details](/Screenshots/3_client_manage.png)

- Edit Client Detail Page <br/>
![Single Client](/Screenshots/6_edit_client.png)

- Vehicle Status and details <br/>
![Vehicle Status](/Screenshots/5_reserve_rent_popup.png)

- Renting a Vehicle <br/>
![Renting](/Screenshots/7_cancel_rent.png)

- Returning a Vehicle <br/>
![Returning](/Screenshots/11_rent_Start.png)

- Adding a vehicle <br/>
![Adding](/Screenshots/9_addVehicle.png)

- Editing a vehicle <br/>
![Editing](/Screenshots/8_edit_vehicle.jpeg)

- Filtering transactions <br/>
![filter-type-a](/Screenshots/10_transaction.png)


## Contributing

Team Leader : **Shareen Ali**

Project Team:

|Member Name|Student Id|Email Address|
|-----|-----|-----------|
| Shareen Ali | 40075802 | shareenali96@gmail.com |
| Munish Sehdev | 40083946 | munishsehdev@gmail.com |
| Gurvinder Singh Bhai Ka | 40070767 | gurvinderbhaika@yahoo.com |
| Bhavpreet Kaur | 40071697 | bhavpreet18@gmail.com |
| Pruthvi Raju Nallaparaju | 40076735 | npraju999@gmail.com |
| Sukesh Kumar mudrakola | 40079835 | sukeshkumar.1995@gmail.com |
