const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.render("pages/home/index", { layout: "./layout/home" });
});

module.exports = router;
