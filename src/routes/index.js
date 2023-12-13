/* eslint-disable */
const fs = require("fs");

let routes = fs
  .readdirSync(__dirname) // read all files and folders into 'src/routes'
  .filter((file) => file !== "index.js") //ignore index.js
  .map(
    (route) => {
      console.log({ route });
      return require(`./${route}`);
    } // import route
  );

routes.forEach((route, index, array) => {
  // multiple router support
  if (Array.isArray(route)) route.forEach((r) => array.push(r));
});

routes = routes.filter(
  (
    route // filter all crash routes ({}, null, undefined, [*])
  ) => route !== {} && !Array.isArray(route)
);

module.exports = routes;
