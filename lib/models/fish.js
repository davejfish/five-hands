const pool = require('../utils/pool');

class Fish {
  id;
  name;
  yummy;

  constructor({ id, name, yummy }) {
    this.id = id;
    this.name = name;
    this.yummy = yummy;
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT * FROM fish
    `);
    return rows.map(row => new Fish(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query(`
    SELECT * FROM fish
    WHERE id = $1`, [id]);
    return new Fish(rows[0]);
  }

}

module.exports = Fish;
