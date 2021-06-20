const router = require('express').Router();
const articlesRepo = require('../repositories/articles');
const commentsRepo = require('../repositories/comments');
const usersRepo = require('../repositories/users');
var articles = [];
var nbComments = [];

/* GET articles listing with number of comments and user creator */
router.get('/', async function(req, res, next) {
  if(req.query.offset || req.query.limit)
  {
    let offset = Number(req.query.offset);
    let limit = Number(req.query.limit);
    res.send(await articlesRepo.getArticles(offset, limit));
  }
  else
  {
    res.send(await articlesRepo.getAllArticles());
  }
});


// GET an article with a list of its comments
router.get('/:id', async function(req, res, next) {
  const idd = await articlesRepo.getArticle(req.params.id);
  res.send( {article : await articlesRepo.getArticle(req.params.id), comments : await commentsRepo.getAllCommentsOfArticle(req.params.id), author : await usersRepo.getUser(idd.UserId)})
});


  
router.post('/', async function(req, res, next) {
  res.json({ myarticle :await articlesRepo.addArticle(req.body)});
});


router.delete('/:id', async function(req, res, next) {
  res.send(await articlesRepo.deleteArticle(req.params.id));

});

module.exports = router;
