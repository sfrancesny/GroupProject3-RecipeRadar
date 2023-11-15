const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
});

// defines a method to check if the provided password is correct
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('userModel', userSchema);

userSchema.set('toJSON', {
    virtuals: true
  });

module.exports = userModel;