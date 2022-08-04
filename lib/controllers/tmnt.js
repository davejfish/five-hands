const { Router } = require('express');
const router = Router();
const TMNT = require('../models/tmnt');

router
  .get('/', async (req, res, next) => {
    try {
      const response = await TMNT.getAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
