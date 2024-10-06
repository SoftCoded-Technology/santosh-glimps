import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./assets/components/Login";
import Signup from "./assets/components/Signup";
import ResetPass from "./assets/components/ResetPass";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "resetpass",
      element: <ResetPass />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
