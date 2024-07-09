# Task Management System

## Overview

The Task Management System is a web application built with Node.js, Express, and SQL Server and ReactJs. It provides a simple way for users to manage their tasks with authentication and task management endpoints.

## Features

- User authentication (login and registration)
- Task management (CRUD operations for tasks)
- JWT-based authentication
- SQL Server integration using `mssql` package
- Environment configuration using `.env` file

## Technologies Used

- Node.js
- Express
- SQL Server
- JWT (JSON Web Tokens)
- `mssql` package
- ReactJs

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abdullahmokhtar/TaskManagementSystem.git
   ```

````

2. Navigate to the project directory:

   ```bash
   cd TaskManagementSystem/backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your SQL Server connection details and JWT secret:

   ```plaintext
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_SERVER=your_db_server
   DB_DATABASE=your_db_name
   JWT_SECRET=your_jwt_secret
   ```

5. Start the server:

   ```bash
   node app.js
   ```

   The server will be running on `http://localhost:3000`.

## Endpoints

### Authentication

- **Login**

  ```http
  POST http://localhost:3000/auth/login
  ```

- **Register**

  ```http
  POST http://localhost:3000/auth/register
  ```

### Tasks

- **Tasks endpoint http method**

  ```http
  GET http://localhost:3000/tasks
  GET http://localhost:3000/tasks/id
  POST http://localhost:3000/tasks
  PUT http://localhost:3000/tasks/id
  DELETE http://localhost:3000/tasks/id
  ```



## Usage

1. **Register a new user** by sending a POST request to `http://localhost:3000/auth/register` with the required user details.
2. **Login** with the registered user credentials by sending a POST request to `http://localhost:3000/auth/login`. The response will include a JWT token.
3. **Manage tasks** by sending authenticated requests to the tasks endpoint (`http://localhost:3000/tasks`). Ensure to include the JWT token in the Authorization header for these requests.

## Environment Variables

The application requires the following environment variables to be set in the `.env` file:

- `DB_USER`: The username for your SQL Server database.
- `DB_PASSWORD`: The password for your SQL Server database.
- `DB_SERVER`: The server address for your SQL Server.
- `DB_DATABASE`: The name of your SQL Server database.
- `JWT_SECRET`: A secret key for signing JWT tokens.

## Dependencies

- `express`: Fast, unopinionated, minimalist web framework for Node.js
- `mssql`: Microsoft SQL Server client for Node.js
- `jsonwebtoken`: JSON Web Token implementation (JWT) for Node.js
- `dotenv`: Module to load environment variables from a `.env` file


```
````
