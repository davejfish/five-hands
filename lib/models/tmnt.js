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

  static async getByID(id) {
    const { rows } = await pool.query(`
      SELECT * FROM tmnt
      WHERE id = $1`, [id]);
    return new TMNT(rows[0]);
  }

  static async insert({ name, weapon }) {
    const { rows } = await pool.query(`
      INSERT INTO tmnt
      (name, weapon)
      VALUES ($1, $2)
      RETURNING *`, [name, weapon]);
    return new TMNT(rows[0]);
  }

  static async updateByID(id, update) {
    const oldTMNT = TMNT.getByID(id);
    const newTMNT = {
      ...oldTMNT,
      ...update
    };
    const { rows } = await pool.query(`
      UPDATE tmnt
      SET name = $1, weapon = $2
      WHERE id = $3
      RETURNING *`, [
      newTMNT.name, 
      newTMNT.weapon, 
      id
    ]);
    return new TMNT(rows[0]);
  }

}

module.exports = TMNT;
