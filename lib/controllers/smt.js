const { Router } = require('express');
const router = Router();
const SMT = require('../models/smt');


router
  .delete('/:id', async (req, res, next) => {
    try {
      const response = await SMT.delete(req.params.id);
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    const response = await SMT.updateByID(req.params.id, req.body);
    try {
      
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    const response = await SMT.insert(req.body);
    try {
      res.json(response);
    } catch (e) {
      next(e);
    }
  })
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
  });

module.exports = router;
