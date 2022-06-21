// eslint-disable-next-line
const router = require('express').Router();

const handler = (req, res) => {
  res.json([]);
};

router.get('/git/:component', handler);

module.exports = router;
