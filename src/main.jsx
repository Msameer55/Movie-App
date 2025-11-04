import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import Login from './pages/Login.jsx';
import AuthRedirect from './pages/AuthRedirect.jsx';
import ProtectedRoute from './middleware/ProtectedRoute.jsx';
import AddtoFavorites from './pages/AddtoFavorites.jsx';
import MoviesList from './pages/MoviesList.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element:  <Home />
      },
      {
        path: "movie/:id",
        element: <MovieDetailPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "auth/callback",
        element: <AuthRedirect />,
      },
      {
        path: "/favorites",
        element: <AddtoFavorites />,
      },
      {
        path: "/movies/:category",
        element: <MoviesList />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
