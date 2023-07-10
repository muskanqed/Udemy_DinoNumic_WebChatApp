const router = require("express").Router();

router.get("/home", (req, res) => {
  return res.send("Home World!");
});

router.use("/", require("./auth"));

module.exports = router;