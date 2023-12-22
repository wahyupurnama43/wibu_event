const db = require("../db/db");
const path = require("path");
const fs = require("fs").promises;

class CosplayerController {
  static async index(req, res) {
    const data = await db("cosplayers");

    res.render("pages/dashboard/cosplayer/list", {
      page_name: "cosplayerList",
      cosplayers: data,
    });
  }

  static async edit(req, res) {
    const { id } = req.params;

    try {
      let result = await db("cosplayers").where("id", id).first();
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  }

  static async store(req, res) {
    const { namaCosplayer, tanggal_lahir, nomor_hp, jenis_kelamin, content } =
      req.body;
    const { filename } = req.file;

    try {
      const result = await db("cosplayers").insert({
        nama_cosplayer: namaCosplayer,
        tanggal_lahir: tanggal_lahir,
        nomor_hp: nomor_hp,
        jenis_kelamin: jenis_kelamin,
        deskripsi_cosplayer: content,
        foto_cosplayer: filename,
      });

      if (result) {
        req.flash("success", "Success Delete Data Cosplayer");
        res.redirect("/cosplayer/list");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async update(req, res) {
    const { namaCosplayer, tanggal_lahir, nomor_hp, jenis_kelamin, content } =
      req.body;
    const { id } = req.params;

    try {
      let data = await db("cosplayers").where("id", id).first();

      if (req.file) {
        // Delete the if found
        const filePath = path.join("public/uploads", data.gambar);
        await fs.unlink(filePath);
      }

      let result = await db("cosplayers")
        .where("id", id)
        .update({
          nama_cosplayer: namaCosplayer,
          tanggal_lahir: tanggal_lahir,
          nomor_hp: nomor_hp,
          jenis_kelamin: jenis_kelamin,
          deskripsi_cosplayer: content,
          foto_cosplayer: req.file ? req.file.filename : undefined,
        });

      if (result) {
        req.flash("success", "Success update Data Cosplayer");
        res.redirect("/cosplayer/list");
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(req, res) {
    const { id } = req.body;
    console.log();
    try {
      // Fetch the event data to get the filename
      const cosplayer = await db("cosplayers").where("id", id).first();

      // Delete the associated file
      const filePath = path.join("public/uploads", cosplayer.foto_cosplayer);
      await fs.unlink(filePath);

      // Delete the event record from the database
      await db("cosplayers").where({ id: id }).del();

      res.redirect("/cosplayer/list"); // No content (successful deletion)
    } catch (error) {
      console.error("Error deleting cosplayers:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = CosplayerController;
