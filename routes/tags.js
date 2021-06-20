const router = require('express').Router();
const tagsRepo = require('../repositories/tags');

/* GET tags listing. */
router.get('/', async function(req, res, next) {

  res.render('tags', { tags : await tagsRepo.getAllTags()})
  });

router.get('/:id', async function(req, res, next) {
  res.send(await tagsRepo.getTag(req.params.id));
});

router.post('/', async function(req, res, next) {
  res.json({ mytag :await tagsRepo.addTag(req.body)});
});

router.put('/', async function(req, res, next) {
  res.json(await tagsRepo.updateTag(req.body));
});

router.delete('/:id', async function(req, res, next) {
  res.send(await tagsRepo.deleteTag(req.params.id));
});

module.exports = router;