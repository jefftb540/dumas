import { createContext, useContext, useEffect, useState } from 'react';
import { Dish } from '../../types/Dish';
import secureLocalStorage from 'react-secure-storage';
import { Chef } from '../../types/Chef';

interface CartItem {
  item: Dish;
  quantity: number;
}

interface CartContextProps {
  addToCart: (item: Dish) => void;
  removeFromCart: (item: Dish) => void;
  getTotalPrice: () => number;
  getPricePerChef: (chefId: string) => number;
  getItensPerChef: (chefId: string) => CartItem[];
  cartItems: CartItem[];
  chefsInCart: Chef[];
  clearCartItems: () => void;
  getItemsCount: () => number;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProviderContext = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [chefsInCart, setChefsInCart] = useState<Chef[]>([]);
  useEffect(() => {
    secureLocalStorage.setItem('cart', JSON.stringify(cartItems));
    const chefs: Chef[] = [];
    cartItems.map(item => {
      if (
        !chefs.includes(
          chefs.find(chef => chef.id === item.item.chef.id) || ({} as Chef)
        )
      ) {
        chefs.push(item.item.chef);
      }
    });
    setChefsInCart(chefs);
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = secureLocalStorage.getItem('cart');
    if (storedCartItems) {
      const items = JSON.parse(storedCartItems as string);
      setCartItems(items);
    }
  }, []);

  const addToCart = (item: Dish) => {
    const isItemInCart = cartItems.find(
      cartItem => cartItem.item.id === item.id
    );

    if (isItemInCart) {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { item, quantity: 1 }]);
    }
  };
  const removeFromCart = (item: Dish) => {
    const isItemInCart = cartItems.find(
      cartItem => cartItem.item.id === item.id
    );

    if (isItemInCart && isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter(cartItem => cartItem.item.id !== item.id));
    } else {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.item.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };
  const getTotalPrice = () =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.item.unit_price * cartItem.quantity,
      0
    );
  const getPricePerChef = (chefId: string) =>
    cartItems.reduce(
      (total, cartItem) =>
        cartItem.item.chef.id === chefId
          ? total + cartItem.item.unit_price * cartItem.quantity
          : 0,
      0
    );
  const getItensPerChef = (chefId: string) =>
    cartItems.filter(cartItem => cartItem.item.chef.id === chefId);

  const clearCartItems = () => setCartItems([]);
  const getItemsCount = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        getTotalPrice,
        getPricePerChef,
        cartItems,
        chefsInCart,
        getItensPerChef,
        clearCartItems,
        getItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      'This hook needs to be called within the CartContextProvider'
    );
  }

  return { ...context };
};
