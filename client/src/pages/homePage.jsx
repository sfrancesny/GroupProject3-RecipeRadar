// client/src/pages/HomePage.jsx
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_RECIPES } from '../graphql/queries';
import { UpdateRecipe, DeleteRecipe } from '../graphql/mutations';
import UpdateRecipeForm from '../components/UpdateRecipeForm'; 
import Modal from '../components/Modal';
import './Home.css'; 

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_RECIPES);
  const [searchTerm, setSearchTerm] = useState('');
  const currentUsername = localStorage.getItem('username'); 

  const [updateRecipeMutation] = useMutation(UpdateRecipe);
  const [deleteRecipeMutation] = useMutation(DeleteRecipe);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateRecipe = (recipe) => {
    console.log(`Update recipe with ID: ${recipe._id}`);
    setSelectedRecipe(recipe);
    setShowModal(true);
  };
  
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const handleFormSubmit = (updatedData) => {
    updateRecipeMutation({
      variables: { _id: selectedRecipe._id, updates: updatedData },
      refetchQueries: [{ query: GET_RECIPES }],
    })
    .then(response => {
      console.log('Recipe updated:', response.data.updateRecipe);
      setShowModal(false);
    })
    .catch(err => {
      console.error('Error updating recipe:', err);
    });
  };

  const handleDeleteRecipe = (id) => {
    deleteRecipeMutation({
      variables: { _id: id },
      refetchQueries: [{ query: GET_RECIPES }],
    })
    .then(response => {
      console.log('Recipe deleted:', response.data.deleteRecipe);
    })
    .catch(err => {
      console.error('Error deleting recipe:', err);
    });
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const recipes = data?.recipes || [];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter recipes if there's a search term, otherwise show all recipes
  const displayedRecipes = searchTerm
    ? recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchTerm))
    : recipes;

  return (
    <div className="home-container">
      <div className="search-container">
        <h1>Search For Your Favorite Recipe</h1>
        <input 
          type="text" 
          className="search-input"
          placeholder="Search by name" 
          value={searchTerm}
          onChange={handleSearchChange} 
        />
      </div>
      <h1>Featured Recipes</h1>
      <div className="recipes-container">
        {displayedRecipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <h3 className="recipe-title">{recipe.title}</h3>
            <p className="recipe-description">Description: {recipe.description}</p>
            <p className="recipe-preparation-time">Preparation Time: {recipe.preparationTime}</p>
            <p className="recipe-cooking-time">Cooking Time: {recipe.cookingTime}</p>
            <p className="recipe-servings">Servings: {recipe.servings}</p>
            <p className="recipe-ingredients">Ingredients: {recipe.ingredients.join(', ')}</p>
            <p className="recipe-instructions">Instructions: {recipe.instructions.join(', ')}</p>
            <p className="recipe-author">Author: {recipe.author}</p>
            {currentUsername === recipe.author && (
              <div className="recipe-actions">
              <button className='update-button' onClick={() => handleUpdateRecipe(recipe._id)}>Update</button>
              <button className='delete-button' onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <Modal show={showModal} onClose={handleModalClose}>
          <UpdateRecipeForm recipe={selectedRecipe} onSubmit={handleFormSubmit} />
        </Modal>
      )}
    </div>
  );
};

export default HomePage;
