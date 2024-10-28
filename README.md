## Tech Stack
Backend: Node.js, JavaScript, Express.js
Database: Mysql
Frontend: React

## Installation
Prerequisites
Node.js: Ensure Node.js is installed.
Database: Mysql database.


## Steps

1. Clone the repository
git clone https://github.com/yourusername/reguard-challenge.git
cd frontend
cd backend

2. npm install

3. Configure Environment Variables on backend directory
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

4. Database Setup

mysql -u <username> -p

5. Start the Development Server 

# Frontend 

npm run start

# Backend

node dataLoader.js
node server.js

## Database Schema
The dataset consists of three main tables that will be structured in the database:

Purchases: Tracks active purchases with associated details.
Customers: Holds information on each customer.
Claims: Logs the progress and status of claims filed by customers.
The structure and relationships between these tables allow admins to monitor the fulfillment pipeline and clients to track their claims.







