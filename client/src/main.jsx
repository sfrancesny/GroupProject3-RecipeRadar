import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SearchResultsPage from './pages/searchResultsPage.jsx';
import RecipePage from './pages/RecipePage.jsx';
import SubmitRecipePage from './pages/submitRecipePage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

// routes for pages 
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "search", element: <SearchResultsPage /> },
      { path: "recipe/:id", element: <RecipePage /> },
      { path: "submit-recipe", element: <SubmitRecipePage/> }
    ]
  },
]);

// Render the RouterProvider with the router configuration
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  )

