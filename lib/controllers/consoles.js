const { Router } = require('express');
const router = Router();
const Console = require('../models/consoles');

router
  .get('/', async (req, res, next) => {
    try {
      const response = await Console.getAll();
      res.json(response);
    } catch (e) {
      next(e);
    }
  });

module.exports = router;
