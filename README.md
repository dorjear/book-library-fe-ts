# Ract App sample - Book library 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## The backend
The source of backend for this on https://github.com/dorjear/book-library-be

## Authentication
This is the with oauth2 authentication.

The backend setup please switch to the feature branch of feature/oauth2-demo on the backend repository.
The sample logon user is `user` and password `secret` 

To make this working the auth server need to be run first. The source code of the auth server is available at https://github.com/dorjear/oauth2-auth-server.

The error handling is limited at this version. Logout and refresh token is not implemented yet. 

The following could be considered when time allowed:
1. Logout 
2. Refresh token 
3. Different error handling on different status returning from API
4. Role based access control
5. Showing login user information
