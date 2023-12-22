const db = require("../db/db");
const path = require("path");
const fs = require("fs").promises;

class EventController {
  static async index(req, res) {
    const data = await db("events");

    res.render("pages/dashboard/event/list", {
      page_name: "eventList",
      events: data,
    });
  }

  static async edit(req, res) {
    const { id } = req.params;

    try {
      let result = await db("events").where("id", id).first();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }

  static async store(req, res) {
    const { namaEvent, lokasiEvent, tanggal_selesai, tanggal_event, content } =
      req.body;
    const { filename } = req.file;
    try {
      let result = await db("events").insert({
        nama_event: namaEvent,
        tanggal_event: tanggal_event,
        tanggal_selesai: tanggal_selesai,
        lokasi_event: lokasiEvent,
        deskripsi_event: content,
        gambar: filename,
      });
      if (result) {
        req.flash("success", "Success Save Data Event");
        res.redirect("/event/list");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async update(req, res) {
    const { namaEvent, lokasiEvent, tanggal_selesai, tanggal_event, content } =
      req.body;
    const { id } = req.params;

    try {
      let data = await db("events").where("id", id).first();

      if (req.file) {
        // Delete the associated file
        const filePath = path.join("public/uploads", data.gambar);
        await fs.unlink(filePath);
      }

      let result = await db("events")
        .where("id", id)
        .update({
          nama_event: namaEvent,
          tanggal_event: tanggal_event,
          tanggal_selesai: tanggal_selesai,
          lokasi_event: lokasiEvent,
          deskripsi_event: content,
          gambar: req.file ? req.file.filename : undefined,
        });
      if (result) {
        req.flash("success", "Success update Data Event");
        res.redirect("/event/list");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(req, res) {
    const { id } = req.body;

    try {
      // Fetch the event data to get the filename
      const event = await db("events").where("id", id).first();

      // Delete the associated file
      const filePath = path.join("public/uploads", event.gambar);
      await fs.unlink(filePath);

      // Delete the event record from the database
      await db("events").where({ id: id }).del();

      res.redirect("/event/list"); // No content (successful deletion)
    } catch (error) {
      console.error("Error deleting event:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = EventController;
