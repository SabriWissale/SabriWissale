
const { User } = require('../models')

module.exports = {

    getAllUsers() {
        return User.findAll()
    },

    countAllUsers() {
        return User.count()
      },

    getUsers(offset = 0, limit = 10) {
        return User.findAll({offset: offset, limit : limit})
    },

    getAdmins() {
      return User.findAll( {
          where:{
              role : "admin",
          }
      })
    },

    getAuthors() {
        return User.findAll( {
            where:{
                role : "author",
            }
        })
    },

    getGuests() {
        return User.findAll( {
            where:{
                role : "guest",
            }
        })
    },

    getUser(id) {
        return User.findOne( {
            where:{
                id : id,
            }
        })
    },

    getUserByEmail(email) {
        return User.findAll( {
            where:{
                email : email,
            }
        })
    },

    addUser(user)
    {
        return User.create({
            username : user.username,
            email : user.email,
            password : user.password,
            role : user.role,
        });
    },

    updateUser(id, user)
    {
        return User.update(user, {where : {id : id}})
    },

    deleteUser(id)
    {
        User.destroy({
            where:{
                id : id,
            }
        })
    },

}