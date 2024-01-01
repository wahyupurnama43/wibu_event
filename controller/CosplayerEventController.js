const db = require("../db/db");
const path = require("path");
const fs = require("fs").promises;

class CosplayerEventController {
  static async index(req, res) {
    const cosplayers = await db("cosplayers");
    const events = await db("events");

    const eventsCosplayer = await db("event_cosplayers")
      .innerJoin("events", "events.id", "event_cosplayers.event_id")
      .innerJoin("cosplayers", "cosplayers.id", "event_cosplayers.cosplayer_id")
      .select(
        "event_cosplayers.id",
        "cosplayers.nama_cosplayer",
        "events.nama_event"
      );

    res.render("pages/dashboard/cosplayerEvent/list", {
      page_name: "cosplayerEventList",
      cosplayers: cosplayers,
      events: events,
      eventsCosplayer: eventsCosplayer,
    });
  }

  static async store(req, res) {
    const { namaCosplayer, namaEvent } = req.body;
    try {
      // cek apakah cosplayer sudah terdaftar?
      const eventCosplayers = await db("event_cosplayers").where({
        cosplayer_id: namaCosplayer,
        event_id: namaEvent,
      });
      // console.log(eventCosplayers);
      if (eventCosplayers.length <= 0) {
        const result = await db("event_cosplayers").insert({
          event_id: namaEvent,
          cosplayer_id: namaCosplayer,
        });

        if (result) {
          req.flash("success", "Success Tambah Data Cosplayer");
        }
      } else {
        req.flash("error", "Data Cosplayer Sudah Terdaftar");
      }
      res.redirect("/cosplayer-event/list");
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(req, res) {
    const { id } = req.body;
    try {
      const data = await db("event_cosplayers").where({ id: id }).del();
      console.log(data);

      res.redirect("/cosplayer-event/list");
    } catch (error) {
      console.error("Error deleting cosplayers:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = CosplayerEventController;
