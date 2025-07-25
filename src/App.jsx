import { BrowserRouter } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ScrollToTop from "./components/scroll/ScrollerToTop";
import UserAuthProvider from "./components/users/userAuth/userAuthRefreshToken";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop /> 
      <UserAuthProvider>
         <div className="pt-16">
        <AdminRoutes /> 
        <UserRoutes /> 
        </div>
        </UserAuthProvider>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

