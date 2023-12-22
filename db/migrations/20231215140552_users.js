/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username", 100).notNullable();
    table.string("email", 100).notNullable();
    table.string("password", 255).notNullable();
    table.string("nama", 150).notNullable();
    table.string("alamat", 200).notNullable();
    table.string("role", 50).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
