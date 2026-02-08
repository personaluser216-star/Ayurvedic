export const getFavorites = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const setFavorites = (ids) => {
  localStorage.setItem("favorites", JSON.stringify(ids));
};
