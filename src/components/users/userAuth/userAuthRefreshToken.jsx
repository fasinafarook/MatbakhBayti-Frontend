import { useEffect } from "react";
import API from "../../../api/axios/axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/userAuthSlice";

const UserAuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await API.get("/user/refresh");
        dispatch(
          login({
            user: res.data.user,
            token: res.data.token,
          })
        );
        console.log("User token refreshed!");
      } catch (error) {
        console.log("Refresh token failed:", error?.response?.data?.message);
      }
    };

    refreshToken();
  }, [dispatch]);

  return children;
};

export default UserAuthProvider;
