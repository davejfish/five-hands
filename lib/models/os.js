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



}

module.exports = OS;
