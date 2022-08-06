const { Router } = require('express');
const router = Router();
const Console = require('../models/consoles');

router
  .delete('/:id', async (req, res, next) => {
    try {
      const response = await Console.delete(req.params.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const response = await Console.updateByID(req.params.id, req.body);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const response = await Console.insert(req.body);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const response = await Console.getByID(req.params.id);
      if(!response) {
        next();
      } else res.json(response);
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
