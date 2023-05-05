# Node.js and Express Authentication API
An authentication API using Node.js and Express.

## Tech Stack
The following technologies were used to develop this project:
- Node.js
- Express

## Features
- User Sign Up
- User Login

## Installation
To run this project, make sure you have Node.js and NPM installed.

1. Clone this repository:
```
git clone https://github.com/sauravhathi/nodejs-authentication-api.git
```

2. Change directory to the project folder:
```
cd nodejs-authentication-api
```

3. Install the dependencies:
```
npm install
```

4. Run the app:
```
npm start
```

## API Endpoints

### Signup
Creates a new user account.

| Method | Endpoint | Request Body | Response Body                 | Response Status |
| ------ | -------- | ------------ | ----------------------------- | --------------- |
| POST   | /signup  | `{ "username": "example", "email": "example@mail.com", "password": "password" }` | `{ "message": "✅ Signup successful" }` | 201             |

### Login
Logs in an existing user.

| Method | Endpoint | Request Body                      | Response Body                                                                       | Response Status |
| ------ | -------- | --------------------------------- | ----------------------------------------------------------------------------------- | --------------- |
| POST   | /login   | `{ "username": "example", "password": "password" }` | `{ "message": "✅ Login successful", "username": "example", "email": "example@mail.com" }` | 200             |

## Server Explanation
The server is created using Express, a popular Node.js web application framework. The server listens on port `3000`.

### Middleware
The `express.json()` middleware is used to parse JSON data in the request body.

### Object to Store User Data
An object named users is created to store user data. The keys of the object are usernames, and the values are objects that contain the user's email and password.

```
const users = {};
```

## Signup Endpoint
The `/signup` endpoint is used to create a new user account. The endpoint expects a JSON object in the request body with the following fields:

- username: the desired username for the new account.
- email: the email address for the new account.
- password: the password for the new account.

The endpoint first checks if all three fields are present in the request body. If any of the fields are missing, the server responds with a `400` Bad Request status and an error message.

If all fields are present, the endpoint checks if the username already exists in the users object. If the username exists, the server responds with a `409` Conflict status and an error message.

If the username does not exist, the user data is added to the users object, and the server responds with a `201` Created status and a success message.

```
app.post('/signup', (req, res) => {
    // Get username, email and password from request body
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email and password are required' });
    }
    if (users[username]) {
        return res.status(409).json({ error: '⛔ Username already exists' });
    }
    // Store user data in users object
    users[username] = { email, password };

    res.status(201).json({ message: '✅ Signup successful' });
});
```

### Login Endpoint
The /login endpoint is used to log in an existing user. The endpoint expects a JSON object in the request body with the following fields:

- username: the username of the account to log in to.
- password: the password for the account.

The endpoint first checks if both fields are present in the request body. If either field is missing, the server responds with a 400 Bad Request status and an error message.

If both fields are present, the endpoint checks if the username exists in the users object and if the password is correct. If the username does not exist or the password is incorrect, the server responds with a 401 Unauthorized status and an error message.

If the username and password are correct, the server responds with a 200 OK status, a success message, the username, and the email address associated with the account.

```
app.post('/login', (req, res) => {
    // Get username and password from request body
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    if (!users[username] || users[username].password !== password) {
        return res.status(401).json({ error: '⛔ Invalid username or password' });
    }

    // Send username and email in response
    res.status(200).json({ message: '✅ Login successful', username, email: users[username].email });
});
```

### Start Server
Finally, the server is started using the app.listen() method.

```
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
```

## Testing the API
The API can be tested using Postman or VS Code(Thunder Client) or any other API testing tool.

## License

[MIT](https://github.com/sauravhathi/nodejs-authentication-api/blob/master/LICENSE)

## Author

- [Saurav Hathi](https://github.com/sauravhathi)
