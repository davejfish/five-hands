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

  static async insert({ name, yummy }) {
    const { rows } = await pool.query(`
    INSERT INTO fish
    (name, yummy)
    VALUES ($1, $2)
    RETURNING *`, [name, yummy]);
    return new Fish(rows[0]);
  }

  static async updateByID(id, update) {
    const oldFish = await Fish.getByID(id);
    const newFish = {
      ...oldFish,
      ...update
    };
    const { rows } = await pool.query(`
      UPDATE fish
      SET name = $1, yummy = $2
      WHERE id = $3
      RETURNING *`, [
      newFish.name,
      newFish.yummy,
      id
    ]);
    return new Fish(rows[0]);
  }

}

module.exports = Fish;
