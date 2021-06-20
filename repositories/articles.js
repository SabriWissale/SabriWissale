const { Article } = require('../models')
module.exports = {

    getAllArticles() {
        return Article.findAll()
    },

    getArticles(offset = 0, limit = 10) {
        return Article.findAll({offset: offset, limit : limit})
    },

    getAllArticlesOfUser(id) {
      return Article.findAll( {
          where:{
              UserId : id,
          }
      })
    },


   

    getArticle(id) {
        return Article.findOne( {
            where:{
                id : id,
            }
        })
    },

    addArticle(article)
    {
        Article.create({
            title : article.title,
            content : article.content,
            published : article.published,
            UserId : article.UserId,
        });
    },

    updateArticle(article)
    {
        Article.update({
            title : article.title,
            content : article.content,
            published : article.published,
            UserId : article.UserId,
        },
        {
            where : 
            {
              id : article.id,
            }
    })
    },

    deleteArticle(id)
    {
        Article.deleteAll({
            where:{
                id : id,
            }
        })
    },

}