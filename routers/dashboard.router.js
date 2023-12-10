const { Router } = require("express");

const router = Router();

router.get("/dashboard", (req, res) => {
  res.render("pages/dashboard/index");
});

module.exports = router;
