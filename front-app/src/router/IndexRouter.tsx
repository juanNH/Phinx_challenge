import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BattlePage } from '../pages/battle/BattlePage';
import { Layout } from '../pages/Layout';
import { HomePage } from '../pages/HomePage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <>404 not found page</>,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "battle",
        element: <BattlePage />
      }
    ]
  },
]);

export const IndexRouter = () => {
  return (
    <RouterProvider router={router} />
  )
}
