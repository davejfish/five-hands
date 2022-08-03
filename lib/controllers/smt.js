const { Router } = require('express');
const router = Router();
const SMT = require('../models/smt');


router
  .get('/:id', async (req, res, next) => {
    try {
      const response = await SMT.getByID(req.params.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const response = await SMT.getAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const response = await SMT.insert(req.body);
      res.json(response);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
