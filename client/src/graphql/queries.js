// src/graphql/queries.js
// queries.js
import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
query {
  recipes {
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


export const GET_SINGLE_RECIPE = gql`
  query($id: ID!) {
    singleRecipe(_id: $id) {
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

export const GET_USERS = gql`
  query {
    users {
      _id
      username
      email
      recipes {
        _id
        title
        description
      }
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query($id: ID!) {
    singleUser(_id: $id) {
      _id
      username
      email
      recipes {
        _id
        title
        description
      }
    }
  }
`;

