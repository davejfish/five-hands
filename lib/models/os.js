const pool = require('../utils/pool');

class OS {
  id;
  name;
  good;

  constructor({ id, name, good }) {
    this.id = id;
    this.name = name;
    this.good = good;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM os
    `);
    return rows.map(row => new OS(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query(`
    SELECT * FROM os
    WHERE id = $1`, [id]);
    return new OS(rows[0]);
  }

  static async insert({ name, good }) {
    const { rows } = await pool.query(`
    INSERT INTO os
    (name, good)
    VALUES ($1, $2)
    RETURNING *`, [name, good]);
    return new OS(rows[0]);
  }

  static async updateByID(id, update) {
    const oldOS = OS.getByID(id);
    const newOS = {
      ...oldOS,
      ...update
    };
    const { rows } = await pool.query(`
    UPDATE os
    SET name = $1, good = $2
    WHERE id = $3
    RETURNING *`, [
      newOS.name,
      newOS.good,
      id,
    ]);
    return new OS(rows[0]);
  }

}

module.exports = OS;
