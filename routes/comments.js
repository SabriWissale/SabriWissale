const router = require('express').Router();
const commentsRepo = require('../repositories/comments');



/* GET comments listing. */
router.get('/', async function(req, res, next) {

  res.render('comments', { comments : await commentsRepo.getAllComments()})
  });


router.get('/:id', async function(req, res, next) {
  res.send(await usersRepo.getAllComments(req.params.id));
});

module.exports = router;
