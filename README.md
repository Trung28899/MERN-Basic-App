## Run app and backend testing

1. Start backend by go to `server` then `npm install` and `npm start`
2. Go to your browser and type `localhost:5000`, now you can test the application

## Testing front-end

1. Start frontend by go to `client` then `npm install` and `npm start`
2. Go to your browser and type `localhost:3000`, now you can front-end

## Front-end Explanation:

1. npm packages:

- \$ npm install axios
  (package for send and receive http requests)
- \$ npm install @material-ui/core
  (UI framework)

(Fontawesome packages for svg icons)

- \$ npm i --save @fortawesome/fontawesome-svg-core
- \$ npm i --save @fortawesome/free-solid-svg-icons
- \$ npm i --save @fortawesome/react-fontawesome
- \$ npm i --save @fortawesome/free-brands-svg-icons

2. File and Component Explanation:

- api/api.js: file that contain axios function to
  +, send post request to backend (localhost:5000/products)
  +, receive data from backed
  +, After receving data, the function will store data
  in app's level variable

- UserContext.js: configuration file for useContext() hooks.
  this is used for application level's state.

- .components/Form/Form.js: contain the form for getting transaction id and send it to the backend

- components/Products: Render list of products in the
  transaction

- ./client/components/ReturnDate: render the chip component for
  last returnable date of the transaction

- ./client/Modal: render to modal that explain why a product is not returnable

## Back-end Explanation:

1. npm packages:

- \$ npm install body-parser
  (Enable the application to send and receive post requests)
- \$ npm install cors
  (Enable cors when front-end sending a request, prevent the cors
  policy issue when sending post request)
- \$ npm install nodemon
  (I don't have to reload the server after I make any change
  with nodemon which helps me save time in development)

2. Code base explanation:

- server.js: entry point of the application, includes all the package setups and routes handling

- ./routes/productRoute.js: directing operation of /products post
  requests to controller

- ./controllers/productsController.js: process request and send a correct response to front-end with correct status code

- ./util/helper.js: contains helper functions for controller to format time, filter data, etc.
