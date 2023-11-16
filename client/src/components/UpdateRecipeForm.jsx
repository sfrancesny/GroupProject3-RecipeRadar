// src/components/UpdateRecipeForm.jsx
import React, { useState, useEffect } from 'react';

const UpdateRecipeForm = ({ recipe, onSubmit }) => {
  const [formData, setFormData] = useState({ /* Initial state based on recipe */ });

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title,
        description: recipe.description,
        preparationTime: recipe.preparationTime,
        cookingTime: recipe.cookingTime,
        servings: recipe.servings,
        ingredients: recipe.ingredients.split(',').map(item => item.trim()),
        instructions: recipe.instructions.split('.').map(item => item.trim()),
      });
    }
  }, [recipe]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    
    // Split ingredients and instructions into arrays
    if (name === "ingredients" || name === "instructions") {
      newValue = value.split(',').map(item => item.trim());
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="preparationTime">Preparation Time:</label>
      <input
        id="preparationTime"
        name="preparationTime"
        type="number"
        value={formData.preparationTime}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="cookingTime">Cooking Time:</label>
      <input
        id="cookingTime"
        name="cookingTime"
        type="number"
        value={formData.cookingTime}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="servings">Servings:</label>
      <input
        id="servings"
        name="servings"
        type="number"
        value={formData.servings}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="ingredients">Ingredients:</label>
      <input
        id="ingredients"
        name="ingredients"
        type="text"
        value={formData.ingredients.join(", ")}
        onChange={handleChange}
      />
    </div>

    <div className="form-group">
      <label htmlFor="instructions">Instructions:</label>
      <textarea
        id="instructions"
        name="instructions"
        value={formData.instructions.join(", ")}
        onChange={handleChange}
      />
    </div>

    <button type="submit" className="update-recipe-button">Update Recipe</button>
  </form>
);
};

export default UpdateRecipeForm;
