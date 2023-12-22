/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cosplayers", (table) => {
    table.increments("id").primary();
    table.string("nama_cosplayer", 100).notNullable();
    table.string("foto_cosplayer", 255).notNullable();
    table.string("deskripsi_cosplayer", 2000).notNullable();
    table.string("jenis_kelamin", 2).notNullable();
    table.date("tanggal_lahir");
    table.string("nomor_hp", 15).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cosplayers");
};
