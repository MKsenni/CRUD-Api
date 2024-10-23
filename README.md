# CRUD API

This project is implement simple CRUD API using in-memory database underneath.

## Prerequisites

Before running this project, make sure you have:

- Node.js version 22.x.x or higher installed

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MKsenni/CRUD-Api.git
   ```
   
2. Install dependencies:
   ```bash
   cd CRUD-Api
   npm install
   ```

## Running the Application:
   **Development Mode**

   In development mode, the application runs with nodemon or ts-node-dev, providing live reload on code changes.

   To start the application in development mode, run:
   ```bash
   npm run start:dev
   ```
   This will start the server on the port specified in the .env file (default is 4000).

   **Production Mode**

   In production mode, the application is bundled using Webpack and runs from the bundled output.

To start the application in production mode:

Build the project:

```bash
npm run start:prod
```
After building, the application will be automatically started on the port defined in the .env file.

### Users are stored as `objects` that have following properties:
- `id` — unique identifier (`string`, `uuid`) generated on server side
- `username` — user's name (`string`, **required**)
- `age` — user's age (`number`, **required**)
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

## API Endpoints: 

``` GET /api/users ```
Retrieves all users.

- Server should answer with `status code` **200** and all users records

```GET /api/users/{userId}```
Retrieves a user by id.

- Server should answer with `status code` **200** and record with `id === userId` if it exists
- Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
- Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

```POST /api/users```
Creates a new user.

- Server should answer with `status code` **201** and newly created record
- Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

```PUT /api/users/{userId}```
Updates an existing user by id.

- Server should answer with` status code` **200** and updated record
- Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
- Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist

```DELETE /api/users/{userId}```
Deletes a user by id.

- Server should answer with `status code` **204** if the record is found and deleted
- Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
- Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

## Environment Variables

The application uses a .env file to define environment-specific variables. Below are the variables used:

PORT - The port the server will run on (default: 4000).

Create a .env file in the root of your project and add the following content:

```
PORT=4000
```

## Testing the API
You can use tools like a Postman:

In the body, selecting raw and set the type to JSON, then input data.

**Create a User:**

Select POST method and enter in URL - http://localhost:4000/api/users

**Get All Users:**

Select GET method and enter in URL - http://localhost:4000/api/users

**Get a User by ID:**

Select GET method and enter in URL - http://localhost:4000/api/users/{userId}

**Update a User:**

Select PUT method and enter in URL - http://localhost:4000/api/users/{userId}
Write body for update user.

**Delete a User:**

Select DELETE method and enter in URL - http://localhost:4000/api/users/{userId}