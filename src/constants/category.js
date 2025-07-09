import { menuItems } from "./menuItem"
export const categories = [
  { name: "All", count: menuItems.length },
  { name: "Main Course", count: menuItems.filter((item) => item.category === "Main Course").length },
  { name: "Appetizers", count: menuItems.filter((item) => item.category === "Appetizers").length },
  { name: "Breakfast", count: menuItems.filter((item) => item.category === "Breakfast").length },
  { name: "Snacks", count: menuItems.filter((item) => item.category === "Snacks").length },
  { name: "Desserts", count: menuItems.filter((item) => item.category === "Desserts").length },
]