const mongoose = require('mongoose');

const user = mongoose.Schema({
    userId: String,
})

module.exports = mongoose.model('user_vk', user);