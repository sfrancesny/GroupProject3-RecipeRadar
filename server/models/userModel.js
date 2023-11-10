const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email addresses are unique
    },
    password: {
        type: String,
        required: true,
    },
    dietaryRestrictions: [
        {
            type: String,
        },
    ],
});
const userModel = mongoose.model('userModel', userSchema);

userSchema.set('toJSON', {
    virtuals: true
  });

module.exports = userModel;