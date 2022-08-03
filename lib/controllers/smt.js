const { Router } = require('express');
const router = Router();
const SMT = require('../models/smt');


router
  .get('/', async (req, res, next) => {
    const response = await SMT.getAll();
    try {
      res.json(response);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
