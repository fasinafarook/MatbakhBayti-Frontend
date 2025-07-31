import Swal from "sweetalert2";
import { addItemToCart, fetchUserCart } from "../../../api/user/userApi";
import { setCart } from "../../../redux/slices/cartAuthSlice";

export const handleAddToCart = async (
  item,
  quantity,
  dispatch,
  onSuccess = () => {},
  cartItems
) => {
  try {
    await addItemToCart(item._id, quantity);

    // Optimistically update the Redux cart
    const existingItem = cartItems?.find((i) => i.id === item._id);

    let updatedCart;
    if (existingItem) {
      updatedCart = cartItems.map((i) =>
        i.id === item._id ? { ...i, quantity: i.quantity + quantity } : i
      );
    } else {
      updatedCart = [
        ...cartItems,
        {
          id: item._id,
          name: item.name,
          price: item.price,
          quantity,
          image: item.image,
        },
      ];
    }

    dispatch(setCart(updatedCart));

    Swal.fire({
      toast: true,
      icon: "success",
      title: existingItem
        ? `Updated quantity to ${existingItem.quantity + quantity} × ${item.name}`
        : `Added ${quantity} × ${item.name} to cart`,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      background: "#222",
      color: "#fff",
    });

    onSuccess();
  } catch (err) {
    console.error("Add to cart failed:", err);
    Swal.fire({
      icon: "error",
      title: "Failed to add to cart",
      text: err?.response?.data?.message || "Something went wrong",
    });
  }
};
