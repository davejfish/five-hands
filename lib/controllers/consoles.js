const { Router } = require('express');
const router = Router();
const Console = require('../models/consoles');

router
  .put('/:id', async (req, res, next) => {
    const response = await Console.updateByID(req.params.id, req.body);
    try {
      
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    const response = await Console.insert(req.body);
    try {
      
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const response = await Console.getByID(req.params.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const response = await Console.getAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
