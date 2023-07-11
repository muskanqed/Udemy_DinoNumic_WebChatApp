const router = require("express").Router();

router.get("/home", (request, response) => {
  return response.send("Home World!");
});

router.use("/", require("./auth"));

module.exports = router;