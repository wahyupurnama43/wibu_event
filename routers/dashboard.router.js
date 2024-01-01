const { Router } = require("express");
const upload = require("../middleware/upload");

const EventController = require("../controller/EventController");
const CosplayerController = require("../controller/CosplayerController");
const CosplayerEventController = require("../controller/CosplayerEventController");
const SearchController = require("../controller/SearchController");

const router = Router();

router.get("/", SearchController.all);

// event router
router.get("/event/list", EventController.index);
router.post("/event/store", upload.single("img"), EventController.store);
router.get("/event/:id", EventController.edit);
router.post("/event/update/:id", upload.single("img"), EventController.update);
router.post("/event/delete", EventController.delete);

// event cosplayer
router.get("/cosplayer/list", CosplayerController.index);
router.post(
  "/cosplayer/store",
  upload.single("img"),
  CosplayerController.store
);
router.get("/cosplayer/:id", CosplayerController.edit);
router.post(
  "/cosplayer/update/:id",
  upload.single("img"),
  CosplayerController.update
);
router.post("/cosplayer/delete", CosplayerController.delete);

// event list event cosplayer
router.get("/cosplayer-event/list", CosplayerEventController.index);
router.post("/cosplayer-event/store", CosplayerEventController.store);
router.post("/cosplayer-event/delete", CosplayerEventController.delete);

// search

router.get("/search/:page", SearchController.index);

module.exports = router;
