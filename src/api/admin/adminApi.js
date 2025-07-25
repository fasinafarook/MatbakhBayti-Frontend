import API from "../axios/axiosInstance";
export const login = async (data) => {
  const res = await API.post('/admin/login', data);
  return res.data;
};
export const logout = async () => {
  const res = await API.post('/admin/logout');
  return res.data;
};