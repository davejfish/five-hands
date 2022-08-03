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
}

module.exports = SMT;

