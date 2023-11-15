// client\src\pages\CreateRecipePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CreateRecipe } from '../graphql/mutations';
import './recipePage.css';

const CreateRecipePage = () => {
  // State hooks for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [servings, setServings] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();

  // UseMutation hook with the imported CreateRecipe mutation
  const [createRecipeMutation] = useMutation(CreateRecipe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRecipeMutation({
        variables: { 
          title, 
          description,
          preparationTime: parseInt(preparationTime, 10),
          cookingTime: parseInt(cookingTime, 10),
          servings: parseInt(servings, 10),
          ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
          instructions: instructions.split('.').map(instruction => instruction.trim()),
        },
      });
      console.log('Recipe created:', response);
      // Redirect or show success message
      navigate('/');
    } catch (error) {
      console.error('Error creating recipe:', error);
      // Show error message
    }
  };

  return (
    <div className="create-recipe-container">
      <h2>Create a Recipe</h2>
      <form onSubmit={handleSubmit} className="create-recipe-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Describe your recipe"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="preparationTime">Preparation Time (in minutes):</label>
          <input
            id="preparationTime"
            type="number"
            placeholder="Enter preparation time"
            value={preparationTime}
            onChange={(e) => setPreparationTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cookingTime">Cooking Time (in minutes):</label>
          <input
            id="cookingTime"
            type="number"
            placeholder="Enter cooking time"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="servings">Servings:</label>
          <input
            id="servings"
            type="number"
            placeholder="Number of servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <input
            id="ingredients"
            type="text"
            placeholder="List ingredients (comma-separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            placeholder="Enter instructions (period-separated)"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
        <button type="submit" className="create-recipe-button">Create Recipe</button>
      </form>
    </div>
  );  
};

export default CreateRecipePage;
