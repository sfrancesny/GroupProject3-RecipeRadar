// server\schemas\typeDefs.js

const typeDefs = `
  type Ingredient {
    _id: ID
    name: String
  }

  type Recipe {
    _id: ID
    title: String
    description: String
    preparationTime: Int
    cookingTime: Int
    servings: Int
    ingredients: [String]
    instructions: [String]
    author: String
  }

  type User {
    _id: ID
    username: String
    email: String
    recipes: [Recipe]
  }

  input LoginInput {
    username: String!
    password: String!
  }  

  input IngredientInput {
    name: String
  }

  input RecipeInput {
    title: String
    description: String
    preparationTime: Int
    cookingTime: Int
    servings: Int
    ingredients: [String]
    instructions: [String]
    author: String
  }

  input UserUpdateInput {
    username: String
    email: String
    password: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type LogoutPayload {
    message: String!
  }

  type Query {
    recipes: [Recipe]
    singleRecipe(_id: ID!): Recipe
    users: [User]
    singleUser(_id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    updateUser(username: String, email: String, password: String): User
    updateRecipe(_id: ID!, updates: RecipeInput!): Recipe
    deleteRecipe(_id: ID!): Recipe
    createRecipe(recipeInput: RecipeInput!): Recipe
    loginUser(username: String!, password: String!): AuthPayload
    logoutUser: LogoutPayload
  }
`;

module.exports = typeDefs;
