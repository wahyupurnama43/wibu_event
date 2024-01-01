const db = require("../db/db");

class SearchController {
  static async index(req, res) {
    const { page } = req.params;
    const { search } = req.query;

    let data = "";
    if (page == "dashboard") {
      const currentDate = new Date();
      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + 7);
      data = await db("events")
        .whereLike("nama_event", "%" + search + "%")
        .whereBetween("tanggal_event", [currentDate, endDate]);
      res.render("pages/dashboard/index", {
        page_name: "dashboard",
        data: data,
      });
    } else if (page == "eventList" && search != "") {
      data = await db("events").whereLike("nama_event", "%" + search + "%");
      res.render("pages/dashboard/event/list", {
        page_name: "eventList",
        events: data,
      });
    } else if (page == "eventList" && search == "") {
      data = await db("events");
      res.render("pages/dashboard/event/list", {
        page_name: "eventList",
        events: data,
      });
    } else if (page == "cosplayerList" && search != "") {
      data = await db("cosplayers").whereLike(
        "nama_cosplayer",
        "%" + search + "%"
      );
      res.render("pages/dashboard/cosplayer/list", {
        page_name: "cosplayerList",
        cosplayers: data,
      });
    } else if (page == "cosplayerList" && search == "") {
      data = await db("cosplayers");
      res.render("pages/dashboard/cosplayer/list", {
        page_name: "cosplayerList",
        cosplayers: data,
      });
    } else if (page == "cosplayerEventList" && search != "") {
      const cosplayers = await db("cosplayers");
      const events = await db("events");
      data = await db("event_cosplayers")
        .innerJoin("events", "events.id", "event_cosplayers.event_id")
        .innerJoin(
          "cosplayers",
          "cosplayers.id",
          "event_cosplayers.cosplayer_id"
        )
        .select(
          "event_cosplayers.id",
          "cosplayers.nama_cosplayer",
          "events.nama_event"
        )
        .whereLike("nama_cosplayer", "%" + search + "%");
      res.render("pages/dashboard/cosplayerEvent/list", {
        page_name: "cosplayerEventList",
        eventsCosplayer: data,
        cosplayers: cosplayers,
        events: events,
      });
    } else if (page == "cosplayerEventList" && search == "") {
      const cosplayers = await db("cosplayers");
      const events = await db("events");
      data = await db("event_cosplayers")
        .innerJoin("events", "events.id", "event_cosplayers.event_id")
        .innerJoin(
          "cosplayers",
          "cosplayers.id",
          "event_cosplayers.cosplayer_id"
        )
        .select(
          "event_cosplayers.id",
          "cosplayers.nama_cosplayer",
          "events.nama_event"
        );
      res.render("pages/dashboard/cosplayerEvent/list", {
        page_name: "cosplayerEventList",
        eventsCosplayer: data,
        cosplayers: cosplayers,
        events: events,
      });
    } else {
      const currentDate = new Date();
      const endDate = new Date(currentDate);
      endDate.setDate(currentDate.getDate() + 7);
      data = await db("events").whereBetween("tanggal_event", [
        currentDate,
        endDate,
      ]);
      res.render("pages/dashboard/index", {
        page_name: "dashboard",
        data: data,
      });
    }
  }

  static async all(req, res) {
    const currentDate = new Date();
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 7);

    let data = await db("events").whereBetween("tanggal_event", [
      currentDate,
      endDate,
    ]);

    res.render("pages/dashboard/index", {
      page_name: "dashboard",
      data: data,
    });
  }
}

module.exports = SearchController;
