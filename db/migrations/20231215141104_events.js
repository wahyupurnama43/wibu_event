/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("events", (table) => {
    table.increments("id").primary();
    table.string("nama_event", 100).notNullable();
    table.dateTime("tanggal_event");
    table.dateTime("tanggal_selesai");
    table.string("lokasi_event", 255).notNullable();
    table.string("deskripsi_event", 2000).notNullable();
    table.string("gambar", 1000).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("events");
};
