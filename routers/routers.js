const { Router } = require("express");

const router = Router();

const dashboardRouter = require("./dashboard.router");
const homeRouter = require("./home.router");

router.use(dashboardRouter);
router.use(homeRouter);

module.exports = router;
