const typeDefs = `
  type Ingredient {
    _id: ID
    ingredientName: String
    category: String
    unitOfMeasurement: String
    nutritionalInfo: NutritionalInfo
  }

  type NutritionalInfo {
    calories: Float
    fat: Float
    protein: Float
  }

  type Recipe {
    _id: ID
    title: String
    description: String
    ingredients: [Ingredient]
    instructions: [String]
    author: User
  }

  type User {
    _id: ID
    username: String
    email: String
    recipes: [Recipe]
  }

  input RecipeInput {
    title: String
    description: String
    ingredients: [String]
    instructions: [String]
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

  type Query {
    recipes: [Recipe]
    recipe(_id: ID!): Recipe
    users: [User]
    user(_id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    updateUser(username: String, email: String, password: String): User
    updateRecipe(_id: ID!, updates: RecipeInput!): Recipe
    deleteRecipe(_id: ID!): Recipe
    createRecipe(title: String!, description: String, ingredients: [String]!, instructions: [String]!): Recipe
  }
`;

module.exports = typeDefs;
