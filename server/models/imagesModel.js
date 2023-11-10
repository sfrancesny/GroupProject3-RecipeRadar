const mongoose = require('mongoose');

const { Schema } = mongoose;

const imagesSchema = new Schema({
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipeModel',
    },
    imageUrl: String,
});

const imagesModel = mongoose.model('imagesModel', imagesSchema);

module.exports = imagesModel;