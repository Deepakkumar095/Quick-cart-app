import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const fetchProducts = async () => {
  try {
    const res = await api.get("/products?limit=200");
    return res.data.products;
  } 
  catch (error) {
    console.error(error);
    return [];
  }

};

export const fetchProductById = async (id) => {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } 
  catch (error) {
    console.error(error);
    return null;
  }
};