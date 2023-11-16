// client\src\pages\CreateRecipePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CreateRecipe } from '../graphql/mutations';
import useAuth from '../Hooks/useAuth';
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
  const [author, setAuthor] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for UI error message
  const navigate = useNavigate();

  // UseMutation hook with the imported CreateRecipe mutation
  const [createRecipeMutation] = useMutation(CreateRecipe);

  const { isAuthenticated } = useAuth(); // Use the useAuth hook

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    // Log the variables for debugging
    console.log("Submitting with:", { title, description, preparationTime, cookingTime, servings, ingredients, instructions, author });

  // console log to inspect final recipeInput data
    console.log("Final recipeInput data:", {
      title,
      description,
      preparationTime: parseInt(preparationTime, 10),
      cookingTime: parseInt(cookingTime, 10),
      servings: parseInt(servings, 10),
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
      instructions: instructions.split('.').map(instruction => instruction.trim()),
      author,
    });
    // Validation
    if (!title || !description || !author || isNaN(preparationTime) || isNaN(cookingTime) || isNaN(servings)) {
      setErrorMessage('Please fill in all fields correctly.');
      return;
    }
  
    // Parse integer values
    const prepTime = parseInt(preparationTime, 10);
    const cookTime = parseInt(cookingTime, 10);
    const numServings = parseInt(servings, 10);
  
    // Ensure arrays are correctly formatted
    const ingredientArray = ingredients.split(',').map(ingredient => ingredient.trim()).filter(Boolean);
    const instructionArray = instructions.split('.').map(instruction => instruction.trim()).filter(Boolean);
  
    try {
      const response = await createRecipeMutation({
        variables: {
          recipeInput: {
            title,
            description,
            preparationTime: prepTime,
            cookingTime: cookTime,
            servings: numServings,
            ingredients: ingredientArray,
            instructions: instructionArray,
            author,
          }
        },
      });
  
      console.log('Recipe created:', response);
      navigate('/');
    } catch (error) {
      console.error('Error creating recipe:', error);
      setErrorMessage('Failed to create recipe. Please try again.');
    }
  };  

  return (
    <div className="create-recipe-container">
      <h1>Create Your Recipe</h1>
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
            type="text"
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
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            placeholder="Enter author's name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          </div>
        <button type="submit" className="create-recipe-button">Create Recipe</button>
      </form>
    </div>
  );  
};

export default CreateRecipePage;