const pool = require('../utils/pool');


class SMT {
  id;
  title;
  platform;

  constructor({ id, title, platform }) {
    this.id = id;
    this.title = title;
    this.platform = platform;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM smt`);
    return rows.map(row => new SMT(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query(`
      SELECT * FROM smt
      WHERE id=$1`, [id]);
    return new SMT(rows[0]);
  }

  static async insert({ title, platform }) {
    const { rows } = await pool.query(`
      INSERT INTO smt (title, platform) 
      VALUES ($1, $2) RETURNING *`, [title, platform]);
    return new SMT(rows[0]);
  }
}

module.exports = SMT;

