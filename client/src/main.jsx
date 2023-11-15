// client/src/Main.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateRecipePage from './pages/CreateRecipePage';
import SignupPage from './pages/SignupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Header />
        <HomePage />
        <Footer />
      </div>
    ),
  },
  {
    path: '/login',
    element: (
      <div>
        <Header />
        <LoginPage />
        <Footer /> 
      </div>
    ),
  },
  {
    path: '/create-recipe',
    element: (
      <div>
        <Header />
        <CreateRecipePage />
        <Footer />
      </div>
      
    ),
  },
  {
    path: '/signup',
    element: (
      <div>
        <Header />
        <SignupPage />
        <Footer />
      </div>
    ),
  },
]);

const Main = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Main;
