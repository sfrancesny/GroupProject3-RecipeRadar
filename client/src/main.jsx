// client/src/Main.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/homePage.jsx';
import LoginPage from './pages/loginPage.jsx';
import CreateRecipePage from './pages/CreateRecipePage.jsx';
import SignupPage from './pages/SignupPage.jsx';

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
