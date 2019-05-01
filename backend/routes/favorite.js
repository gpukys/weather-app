const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');
const favorites = [];

/* POST new favorite city */
router.post('/', (req, res) => {
  if (req.body.lat === undefined) {
    res.status(400).json({
      error: 'The field lat is required'
    });
    return;
  } else if (req.body.lat > 180 || req.body.lat < -180) {
    res.status(400).json({
      error: 'The field lat must be between 180 and -180'
    });
    return;
  }

  if (!req.body.long === undefined) {
    res.status(400).json({
      error: 'The field long is required'
    });
    return;
  } else if (req.body.long > 180 || req.body.long < -180) {
    res.status(400).json({
      error: 'The field long must be between 180 and -180'
    });
    return;
  }

  favorites.push(req.body)
  res.status(201).json({})
})

/* GET all favorite cities */
router.get('/', (req, res) => {
  res.status(200).json(favorites);
});

/* DELETE city by id */
router.delete('/:id', (req, res) => {
  const index = favorites.findIndex(city => city.uid === req.params.id);
  if (index === -1) {
    res.status(404).json({error: `The city with id:${req.params.id} was not found`});
    return;
  }
  favorites.splice(index, 1);
  res.status(204).json('')
});

module.exports = router;