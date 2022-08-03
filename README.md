# avalith-first-practice
This is the first practice project in Skill Factory by Avalith. Skill Factory is a Node.js Bootcamp.

The practice stated that we create an API using [Fake Store API](https://fakestoreapi.com/) as the database.

## Exercises:
- [x] Create a project and install all needed dependencies.
- [x] Create an app.js file that runs a local server.
- [x] Using the provided API, generate models for Products, Carts and Users.
- [x] Create a simple middleware that logs each request to the server.
- [x] Create a middleware that handles invalid endpoints (404 Http Error).
- [x] Create the following endpoints:
  - [x] all basic `GET` endpoints (/products, /products/:id, users, etc)
  - [x] `GET /products/categories` should return an array of objects that contains the name of the category and their respective products.
  - [x] `GET /users/firsts/` should return the first three users sorted by ID.
  - [x] `GET /products/prices` should return a list of products that has the keys: id, title and price. It should be possible to sort by price the response with 'order' query.
  - [x] `GET /products/expensive` should return the most expensive products from their respective category.
  - [x] `GET /carts/bigcarts` should return all the carts that contain more than 2 products and the username of the person that ordered that cart.
