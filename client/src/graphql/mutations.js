// mutation.js
import { gql } from '@apollo/client';

export const CreateRecipe = gql`
  mutation CreateRecipe($recipeInput: RecipeInput) {
    createRecipe(recipeInput: $recipeInput) {
    title
    description
    preparationTime
    cookingTime
    servings
    ingredients
    instructions
    author 
  }
}`;

export const UpdateRecipe = gql`
  mutation UpdateRecipe($_id: ID!, $updates: RecipeInput) {
    updateRecipe(_id: $_id, updates: $updates) {
      _id
      title
      description
      preparationTime
      cookingTime
      servings
      ingredients
      instructions
      author 
    }
  }
`;

export const DeleteRecipe = gql`
  mutation DeleteRecipe($_id: ID!) {
    deleteRecipe(_id: $_id) {
      _id
      title
      description
      preparationTime
      cookingTime
      servings
      ingredients
      instructions
      author 
    }
  }
`;

export const CreateUser = gql`
  mutation CreateUser($userInput: UserInput) {
    createUser(userInput: $userInput) {
      _id
      username
      email
    }
  }
`;

export const UpdateUser = gql`
  mutation UpdateUser($userInput: UserUpdateInput) {
    updateUser(userInput: $userInput) {
      _id
      username
      email
    }
  }
`;

export const LoginUser = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LogoutUser = gql`
  mutation {
    logoutUser {
      message
    }
  }
`;
