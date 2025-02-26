import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { getCartItemsService } from "../services/cartService";
import CardProduct from "../components/CardProduct";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    const fetchCartItems = async () => {
      if (userToken) {
        const cartData = await getCartItemsService(userToken);
        setCartItems(cartData);
      }
    };

    fetchProducts();
    fetchCartItems();
  }, [userToken]);

  const handleUpdateCart = async () => {
    if (userToken) {
      try {
        const updatedCart = await getCartItemsService(userToken);
        setCartItems(updatedCart);
      } catch (error) {
        console.error("Error updating cart items:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const cartItem = cartItems.find((item) => item.productId === product.id);
          return (
            <CardProduct
              key={product.id}
              product={product}
              isInCart={!!cartItem}
              cartItemId={cartItem?.id}
              onUpdateCart={handleUpdateCart} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
