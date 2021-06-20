const { Tag } = require('../models')

module.exports = {

    getAllTags() {
        return Tag.findAll()
    },

    getTag(id) {
        return Tag.findOne( {
            where:{
                id : id,
            }
        })
    },

    addTag(tag)
    {
        Tag.create({
            name : tag.name,
        });
    },

    updateTag(tag)
    {
        Tag.update({
            name : tag.name,
        },
        {
            where : 
            {
              id : tag.id,
            }
    })
    },

    deleteTag(id)
    {
        Tag.deleteAll({
            where:{
                id : id,
            }
        })
    },

}