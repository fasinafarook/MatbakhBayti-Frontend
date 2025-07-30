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
    const currentCartData = await fetchUserCart();
    const currentCart = currentCartData.items.map((i) => ({
      id: i.product?._id,
      name: i.product?.name,
      price: i.product?.price,
      quantity: i.quantity,
      image: i.product?.image,
    }));

    const existingItem = currentCart.find((i) => i.id === item._id);

    await addItemToCart(item._id, quantity);

    const updatedCart = await fetchUserCart();
    const formattedItems = updatedCart.items.map((i) => ({
      id: i.product?._id,
      name: i.product?.name,
      price: i.product?.price,
      quantity: i.quantity,
      image: i.product?.image,
    }));

    const updatedItem = formattedItems.find((i) => i.id === item._id);

    dispatch(setCart(formattedItems));

    Swal.fire({
      toast: true,
      icon: "success",
      title: existingItem
        ? `Updated quantity to ${updatedItem?.quantity} × ${item.name}`
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
