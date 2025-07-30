// import { useEffect, useState } from "react";
// import { getMenuItems } from "../../../api/user/userApi"; // adjust path as needed

// const useMenuItems = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const response = await getMenuItems();
//         setMenuItems(response.data.data); // Adjust based on your API's response shape
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch menu items", err);
//         setError("Failed to fetch menu items");
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, []);

//   return { menuItems, loading, error };
// };

// export default useMenuItems;
