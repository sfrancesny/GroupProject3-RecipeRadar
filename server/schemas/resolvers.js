const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const { signToken, AuthenticationError, AuthorizationError } = require('../utils/auth');

const resolvers = {
    Query: {
        recipes: async () => {
            return await Recipe.find();
        },
        recipe: async (parent, { _id }) => {
            return await Recipe.findById(_id);
        },
        users: async () => {
            return await User.find();
        },
        user: async (parent, args, context) => {
            if (context.user) {
                return await User.findById(context.user._id);
            }
            throw new AuthenticationError('You are not authenticated.');
        },
    },
    Mutation: {
        createRecipe: async (parent, args, context) => {
            if (context.user) {
                const recipe = await Recipe.create({ ...args, author: context.user._id });
                return recipe;
            }
            throw new AuthenticationError('You must be logged in to create a recipe.');
        },
        updateRecipe: async (parent, { _id, ...updates }, context) => {
            if (context.user) {
                const recipe = await Recipe.findById(_id);

                if (!recipe) {
                    throw new Error('Recipe not found');
                }

                if (recipe.author.toString() !== context.user._id) {
                    throw new AuthorizationError('You are not authorized to update this recipe.');
                }

                Object.assign(recipe, updates);
                await recipe.save();
                return recipe;
            }
            throw new AuthenticationError('You must be logged in to update a recipe.');
        },
        deleteRecipe: async (parent, { _id }, context) => {
            if (context.user) {
                const recipe = await Recipe.findById(_id);

                if (!recipe) {
                    throw new Error('Recipe not found');
                }

                if (recipe.author.toString() !== context.user._id) {
                    throw new AuthorizationError('You are not authorized to delete this recipe.');
                }

                await recipe.remove();
                return recipe;
            }
            throw new AuthenticationError('You must be logged in to delete a recipe.');
        },
        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
            throw new AuthenticationError('You must be logged in to update your profile.');
        },
    },
    Recipe: {
        author: async (recipe) => {
            return await User.findById(recipe.author);
        },
    },
    User: {
        recipes: async (user) => {
            return await Recipe.find({ author: user._id });
        },
    },
};

module.exports = resolvers;

