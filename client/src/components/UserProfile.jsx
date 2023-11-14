// UserProfilePage.jsx
import React from 'react';
import { useQuery } from '@apollo/client';
// import { useSelector } from 'react-redux';
// import { GET_USER } from './graphql/queries'; // Imports GraphQL query

function UserProfilePage() {
  const userId = useSelector((state) => state.user._id); // Get user ID from Redux store
  const { loading, error, data } = useQuery(GET_USER, { variables: { _id: userId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.user;

  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      <p>Email: {user.email}</p>
      <h3>Recipes</h3>
      <ul>
        {user.recipes.map((recipe) => (
          <li key={recipe._id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserProfilePage;
