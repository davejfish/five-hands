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

}

module.exports = OS;
