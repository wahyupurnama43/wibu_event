const db = require("../db/db");
const path = require("path");
const fs = require("fs").promises;

class CosplayerEventController {
  static async index(req, res) {
    // const

    res.render("pages/dashboard/cosplayerEvent/list", {
      page_name: "cosplayerEventList",
    });
  }
}

module.exports = CosplayerEventController;
