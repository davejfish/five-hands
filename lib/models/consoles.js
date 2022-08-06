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
    if(!rows[0]) return null;
    return new Console(rows[0]);
  }

  static async insert({ console, released }) {
    const { rows } = await pool.query(`
      INSERT INTO consoles
      (console, released)
      VALUES ($1, $2) RETURNING *`, [console, released]);
    return new Console(rows[0]);
  }

  static async updateByID(id, update) {
    const oldConsole = await Console.getByID(id);
    const newConsole = {
      ...oldConsole,
      ...update
    };
    const { rows } = await pool.query(`
      UPDATE consoles
      SET console = $1, released = $2
      WHERE id = $3 RETURNING *`, [
      newConsole.console,
      newConsole.released,
      id
    ]);
    return new Console(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM consoles
      WHERE id = $1
      RETURNING *`, [id]);
    return new Console(rows[0]);
  }

}

module.exports = Console;
