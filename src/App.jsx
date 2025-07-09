import { BrowserRouter } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import ScrollToTop from "./components/scroll/ScrollerToTop";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop /> 
        <UserRoutes /> 
      </BrowserRouter>
    </>
  );
}

