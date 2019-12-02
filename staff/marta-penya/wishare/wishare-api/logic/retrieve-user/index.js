const { validate, errors: { NotFoundError, ContentError } } = require('wishare-util')
const { ObjectId, models: { User } } = require('wishare-data')
const fs = require('fs')


 /**
 * Retrieves the user data
 * 
 * @param {ObjectId} id of the user
 * 
 * @returns {Promise}
 */

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)
        
        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const dir = `./data/users/${id}`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        } 
        
        const { name, surname, email, birthday, description, wishes, savedWishes, friends } = user.toObject()
            wishes.forEach(wish => {
                wish.id = wish._id.toString()
                delete wish._id
                delete wish.blocked
            })

        return { id, name, surname, email, birthday, description, wishes, savedWishes, friends }
    })()
}



