import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginForm from "../layout/LoginForm";
import RegisterForm from "../layout/RegisterForm";
import RestaurantForm from "../layout/RestaurantForm"
import useAuth from "../hooks/useAuth";
import Header from "../layout/Header";
import UserHome from "../layout/UserHome";
import DataRestaurantForm from "../layout/DataRestaurantForm"



const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
  


    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <UserHome /> },
      { path: "/restaurant", element: <RestaurantForm /> },
      { path: "//restaurantData/:id", element: <DataRestaurantForm /> },
    ],
  },  
]);


export default function AppRouter() {
  const { user } = useAuth();
  const finalRouter = user?.id ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;

}


