const { Comment } = require('../models')

module.exports = {

    getAllComments() {
        return Comment.findAll()
    },

    getAllCommentsOfArticle(id) {
      return Comment.findAll( {
          where:{
              ArticleId : id,
          }
      })
    },

    countAllCommentsOfArticle(id) {
        return Comment.count( {
            where:{
                ArticleId : id,
            }
        })
      },

    getComment(id) {
        return Comment.findOne( {
            where:{
                id : id,
            }
        })
    },

    addComment(comment)
    {
        Comment.create({
            content : comment.content,
            ArticleId : comment.ArticleId,
        });
    },

    updateComment(comment)
    {
        Comment.update({
            content : comment.content,
            ArticleId : comment.ArticleId,
        },
        {
            where : 
            {
              id : comment.id,
            }
    })
    },

    deleteComment(id)
    {
        Comment.deleteAll({
            where:{
                id : id,
            }
        })
    },

}