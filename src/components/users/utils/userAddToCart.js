import Swal from "sweetalert2";
import { addItemToCart, fetchUserCart } from "../../../api/user/userApi";
import { setCart } from "../../../redux/slices/cartAuthSlice";

export const handleAddToCart = async (
  item,
  quantity,
  dispatch,
  onSuccess = () => {}
) => {
  try {

    // Fetch latest cart from backend
    const cartRes = await fetchUserCart(); // returns { items: [...] }
    const backendCartItems = cartRes.items.map((cartItem) => ({
      id: cartItem.product._id,
      name: cartItem.product.name,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      image: cartItem.product.image,
    }));

    // Check if this product already exists in backend cart
    const existingItem = backendCartItems.find((i) => i.id === item._id);

    // Add/update backend cart
    await addItemToCart(item._id, quantity);

    // Prepare updated Redux cart
    const updatedCart = existingItem
      ? backendCartItems.map((i) =>
          i.id === item._id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      : [
          ...backendCartItems,
          {
            id: item._id,
            name: item.name,
            price: item.price,
            quantity,
            image: item.image,
          },
        ];

    // Update Redux state

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

    // Show toast
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
