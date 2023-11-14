// client/src/pages/HomePage.jsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '../graphql/queries';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes = data?.recipes || [];

  return (
    <div>
      <h2>Featured Recipes</h2>
         {/* search bar here */}
         <input type="text" placeholder="Search by name" />
      <button>Search</button>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <h3>{recipe.title}</h3>
            <p>Description: {recipe.description}</p>
            <p>Preparation Time: {recipe.preparationTime}</p>
            <p>Cooking Time: {recipe.cookingTime}</p>
            <p>Servings: {recipe.servings}</p>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
            <p>Instructions: {recipe.instructions.join(', ')}</p>
           <p>Author: {recipe.author}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

















