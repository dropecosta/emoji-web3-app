import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Add from "./components/Add/Add";
import './App.css';

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/add/:emoji", element: <Add /> },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
