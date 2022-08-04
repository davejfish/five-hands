const { Router } = require('express');
const router = Router();
const Fish = require('../models/fish');

router
  .get('/:id', async (req, res, next) => {
    try {
      const response = await Fish.getByID(req.params.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const response = await Fish.getAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
