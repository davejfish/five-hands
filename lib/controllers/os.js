const { Router } = require('express');
const router = Router();
const OS = require('../models/os');

router
  .get('/', async (req, res, next) => {
    const response = await OS.getAll();
    try {
      
      res.json(response);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
