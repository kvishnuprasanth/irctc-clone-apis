# IRCTC Railway Booking API

## Overview
This project is a railway seat booking API built using *Node.js, **Express.js, and **PostgreSQL*. It allows users to register, search for trains, check seat availability, and book seats while handling race conditions.

## Features
- User authentication (Register/Login)
- Train management (Admin only)
- Seat availability check
- seat booking
- Role-based access control

## Tech Stack
- *Backend*: Node.js, Express.js
- *Database*: PostgreSQL
- *Authentication*: JSON Web Tokens (JWT)

## Setup Instructions
### 1. Clone the Repository
sh
git clone https://github.com/kvishnuprasanth/irctc-clone-apis.git
cd irctc-clone-apis


### 2. Install Dependencies
sh
npm install


### 3. Configure the Environment Variables
Create a .env file in the root directory and add the following:
PG_USER="postgres"
PG_HOST="localhost"
PG_DATABASE="irctc"
PG_PASSWORD=yourpassword
PG_PORT="5432"
SECRET_JWT="SECRET"
API_KEY="YOUR KEY"

### 4. Set Up PostgreSQL Database
create a db as irctc


### 5. Start the Server

npm start

## API Endpoints

## user Auth
//register
POST http://localhost:3000/api/user/register
body{
    name, email,password
}
//login
POST http://localhost:3000/api/user/login
body{
    email,password
}
//admin login
POST http://localhost:3000/api/user/admin
body{
    email, password, apikey
}

## trains
//add train
POST http://localhost:3000/api/train/add
body{
    trainName, source, destination, seats 
}
cookies{
token
}
// get tarin from one destination to other
GET http://localhost:3000/api/train/get
params{
    source, destination
}

## bookings
// booking seat
POST http://localhost:3000/api/booking/book
body{
     source, destination
}
cookies{
token
}
//get booking deatils
POST http://localhost:3000/api/booking/get
cookies{
token
}
