// client/src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECIPES } from '../graphql/queries';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes = data?.recipes || [];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter recipes if there's a search term, otherwise show all recipes
  const displayedRecipes = searchTerm
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm)
      )
    : recipes;

  return (
    <div>
      <div>
        <h2>Search For Your Favorite Recipe</h2>
        <input 
          type="text" 
          placeholder="Search by name" 
          value={searchTerm}
          onChange={handleSearchChange} 
        />
      </div>
      <h2>Featured Recipes</h2>
      <ul>
        {displayedRecipes.map((recipe) => (
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