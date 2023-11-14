import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Header />
        <HomePage />
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
