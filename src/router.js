const express = require('express');
const routes = require('./routes/index.js');

const router = express.Router();

console.log(routes)

routes.forEach((route) => {
  const { prefix } = route;
  const subRouter = express.Router();
  route.inject(subRouter);
  router.use(prefix, subRouter);
});

module.exports = router;
