const { Router } = require('express');
const router = Router();
const TMNT = require('../models/tmnt');

router
  .get('/:id', async (req, res, next) => {
    try {
      const response = await TMNT.getByID(req.params.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const response = await TMNT.getAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
