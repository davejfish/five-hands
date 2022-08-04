const pool = require('../utils/pool');

class Console {
  id;
  console;
  released;

  constructor({ id, console, released }) {
    this.id = id;
    this.console = console;
    this.released = released;
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM consoles
    `);
    return rows.map(row => new Console(row));
  }

  static async getByID(id) {
    const { rows } = await pool.query(`
      SELECT * FROM consoles
      WHERE id = $1`, [id]);
    return new Console(rows[0]);
  }

  static async insert({ console, released }) {
    const { rows } = await pool.query(`
      INSERT INTO consoles
      (console, released)
      VALUES ($1, $2) RETURNING *`, [console, released]);
    return new Console(rows[0]);
  }
}

module.exports = Console;
