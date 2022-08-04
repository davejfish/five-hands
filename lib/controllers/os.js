const { Router } = require('express');
const router = Router();
const OS = require('../models/os');

router
  .post('/', async (req, res, next) => {
    try {
      const response = await OS.insert(req.body);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const response = await OS.getByID(req.params.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    const response = await OS.getAll();
    try {
      
      res.json(response);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
