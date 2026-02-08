export const getShoppingCart = () => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("shoppingcart");
  return data ? JSON.parse(data) : [];
};

export const setShoppingCart = (items) => {
  localStorage.setItem("shoppingcart", JSON.stringify(items));
  window.dispatchEvent(new Event("shoppingcartupdate"));
  
};


export const clearShoppingCart = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("shoppingcart");

  // 🔥 IMPORTANT: cart icon ne notify karo
  window.dispatchEvent(new Event("shoppingcartupdate"));
};
