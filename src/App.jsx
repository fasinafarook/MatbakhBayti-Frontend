import { BrowserRouter } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ScrollToTop from "./components/scroll/ScrollerToTop";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop /> 
         <div className="pt-16">
        <AdminRoutes /> 
        <UserRoutes /> 
        </div>
      </BrowserRouter>
    </>
  );
}

