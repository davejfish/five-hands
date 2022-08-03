const { Router } = require('express');
const router = Router();
const SMT = require('../models/smt');


router
  .get('/:id', async (req, res, next) => {
    const response = await SMT.getByID(req.params.id);
    try {
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    const response = await SMT.getAll();
    try {
      res.json(response);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
