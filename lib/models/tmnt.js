const pool = require('../utils/pool');


class TMNT {
  id;
  name;
  weapon;

  constructor({ id, name, weapon }) {
    this.id = id;
    this.name = name;
    this.weapon = weapon;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM tmnt
    `);
    return rows.map(row => new TMNT(row));
  }

}

module.exports = TMNT;
