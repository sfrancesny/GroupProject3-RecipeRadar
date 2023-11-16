// server\schemas\resolvers.js

const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { signToken, AuthenticationError, AuthorizationError } = require('../utils/auth');

const resolvers = {
    Query: {
        recipes: async () => {
            try {
                const recipes = await Recipe.find();
                console.log('Fetched recipes:', recipes);
                return recipes;
            } catch (error) {
                console.error('Error fetching recipes:', error);
                throw new Error('Failed to fetch recipes');
            }
        },
        singleRecipe: async (parent, { _id }) => {
            return await Recipe.findById(_id);
        },
        users: async () => {
            return await User.find();
        },
        singleUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findById(context.user._id);
            }
            throw new AuthenticationError('You are not authenticated.');
        },
    },
    Mutation: {
        createRecipe: async (parent, args, context) => {
            console.log('Received arguments for createRecipe:', args);
            console.log('User context:', context.user);

            if (context.user) {
                try {
                    console.log('Attempting to create recipe with:', args.recipeInput);
                    const recipe = await Recipe.create({ 
                        ...args.recipeInput, 
                        author: context.user.username
                    }); 
                    console.log('Recipe created successfully:', recipe);
                    return recipe;
                } catch (error) {
                    console.error('Error creating recipe:', error);
                    throw new Error('Failed to create recipe. Please check the input data.');
                }
            } else {
                console.log('Create recipe attempt without authentication');
                throw new AuthenticationError('You must be logged in to create a recipe.');
            }
        },

        updateRecipe: async (parent, { _id, ...updates }, context) => {
            if (context.user) {
                const recipe = await Recipe.findById(_id);

                if (!recipe) {
                    throw new Error('Recipe not found');
                }

                if (recipe.author !== context.user.username) {
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
          
              if (recipe.author !== context.user.username) { 
                throw new AuthorizationError('You are not authorized to delete this recipe.');
              }
          
              // Use findByIdAndRemove or deleteOne
              await Recipe.findByIdAndRemove(_id);
              // or await Recipe.deleteOne({ _id });
          
              return recipe;
            }
            throw new AuthenticationError('You must be logged in to delete a recipe.');
          },          
          
        createUser: async (parent, args) => {
            const existingUser = await User.findOne({ username: args.username });
        
            if (existingUser) {
                // Username already exists, handle it gracefully
                throw new Error('Username is already taken. Please choose a different username.');
            }
        
            try {
                const user = await User.create(args);
                const token = signToken(user);
                console.log('User created successfully:', user);
                return { token, user };
            } catch (error) {
                console.error('Error creating user:', error);
                throw error; // Rethrow the error to propagate it to the client
            }
        },                      
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
            throw new AuthenticationError('You must be logged in to update your profile.');
        },
        loginUser: async (parent, { username, password }) => {
            console.log('Received credentials:', username, password);
          
            const user = await User.findOne({ username });
          
            if (!user || !user.isCorrectPassword(password)) {
              console.log('Invalid credentials');
              throw new AuthenticationError('Invalid credentials');
            }
          
            const token = signToken(user);
            return { token, user };
          },
          
        logoutUser: (parent, args, context) => {
            if (context.user) {
                // Clear or invalidate the token on the client-side
                return { message: 'Successfully logged out' };
            } else {
                throw new AuthenticationError('You are not authenticated.');
            }
        },
    },
    Recipe: {
        author: (recipe) => {
            return recipe.author;
        },
    },    
    User: {
        recipes: async (user) => {
            // Find recipes by the user's username or email
            return await Recipe.find({ author: user.username });
        },
    },
};

module.exports = resolvers;
