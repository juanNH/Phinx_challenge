import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { BattlePage } from '../pages/battle/BattlePage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!<Outlet/></div>,
    errorElement: <>404</>,
    children:[
      {
        path:"battle",
        element:<BattlePage />
      }
    ]
  },
]);

export const IndexRouter = () => {
  return (
    <RouterProvider router={router} />
  )
}
