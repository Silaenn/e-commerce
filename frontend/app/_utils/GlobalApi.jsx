import axios from "axios";
import { getApiBaseUrl } from "./backend";

const axiosClient = axios.create({
  baseURL: getApiBaseUrl(),
});

const getCategoryList = () =>
  axiosClient.get("/categories?populate[image][fields][0]=url&fields[0]=name").then((resp) => {
    return resp.data.data;
  });

const getSliders = () =>
  axiosClient.get("/sliders?populate[image][fields][0]=url&fields[0]=name&fields[1]=link").then((resp) => {
    return resp.data.data;
  });

const getAllProducts = () =>
  axiosClient.get("/products?populate[images][fields][0]=url&populate[categories][fields][0]=name&fields[0]=name&fields[1]=sellingPrice&fields[2]=price&fields[3]=description").then((resp) => {
    return resp.data.data;
  });

const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[categories][name][$in]=" + category + "&populate[images][fields][0]=url&fields[0]=name&fields[1]=sellingPrice&fields[2]=price&fields[3]=description")
    .then((resp) => {
      return resp.data.data;
    });

const searchProducts = (searchTerm) =>
  axiosClient
    .get(
      `/products?filters[$or][0][slug][$containsi]=${searchTerm}&filters[$or][1][categories][name][$containsi]=${searchTerm}&populate[images][fields][0]=url&fields[0]=name&fields[1]=sellingPrice&fields[2]=price&fields[3]=description`
    )
    .then((resp) => {
      return resp.data.data;
    });

const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const signInUser = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItems = (userId, jwt) =>
  axiosClient
    .get("/user-carts?filters[userId][$eq]=" + userId + "&populate[products][populate][images][fields][0]=url&populate[products][fields][0]=name&populate[products][fields][1]=sellingPrice", {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
    .then((res) => {
      const data = res.data.data;
      const cartItemList = data.map((item) => {
        const productSource = Array.isArray(item.products)
          ? item.products[0]
          : item.products?.data?.[0];
        const product = productSource?.attributes
          ? { id: productSource.id, ...productSource.attributes }
          : productSource || null;

        const imageUrl =
          product?.images?.[0]?.url ||
          product?.images?.data?.[0]?.attributes?.url ||
          product?.images?.data?.[0]?.url ||
          "";

        return {
          name: product ? product.name : "Unknown",
          quantity: item.quantity,
          amount: item.amount,
          image: imageUrl,
          actualPrice: product ? product.sellingPrice : 0,
          id: item.documentId,
          product: product ? product.id : null,
        };
      });

      return cartItemList;
    });

const deleteCartItems = (id, jwt) =>
  axiosClient.delete("/user-carts/" + id, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const updateCartQuantity = (id, data, jwt) =>
  axiosClient.put("/user-carts/" + id, data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const createOrder = async (payload, jwt) => {
  try {
    // Persiapkan data untuk Midtrans
    const midtransPayload = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}`,
        gross_amount: Math.round(payload.data.totalOrderAmount),
      },
      customer_details: {
        first_name: payload.data.username,
        email: payload.data.email,
      },
    };

    // Panggil API route kita (Next.js API route)
    const midtransResponse = await axios.post(
      "/api/create-midtrans-transaction",
      midtransPayload
    );

    // Simpan order ke backend Strapi
    const orderResponse = await axiosClient.post("/orders", payload, {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    });

    return { transaction: midtransResponse.data, order: orderResponse.data };
  } catch (error) {
    console.error("Error in createOrder:", error);
    throw error;
  }
};

const getLatestProducts = () =>
  axiosClient.get("/products?pagination[pageSize]=8&sort[0]=id:desc&populate[images][fields][0]=url&populate[categories][fields][0]=name&fields[0]=name&fields[1]=sellingPrice&fields[2]=price&fields[3]=description").then((resp) => {
    return resp.data.data;
  });

const getMyOrder = (userId, jwt) =>
  axiosClient
    .get(
      "/orders?filters[userId][$eq]=" +
        userId,
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const response = resp.data.data;
      const orderList = response.map((item) => ({
        id: item.documentId,
        totalOrderAmount: item.totalOrderAmount,
        paymentId: item.paymentId,
        orderItemList: item.orderitemList,
        createdAt: item.createdAt,
        status: item.Status,
      }));

      return orderList;
    });

const updateOrder = async (id, newStatus, jwt) => {
  try {
    const orderResponse = await axiosClient.put(
      `/orders/${id}`,
      {
        data: {
          Status: newStatus,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    console.log(
      "Full update response:",
      JSON.stringify(orderResponse.data, null, 2)
    );
    return orderResponse.data;
  } catch (error) {
    console.error(
      "Error saat memperbarui pesanan:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

const addUserAddress = (data, jwt) =>
  axiosClient.post("/user-addresses", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getUserAddresses = (userId, jwt) =>
  axiosClient
    .get("/user-addresses?filters[userId][$eq]=" + userId, {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    })
    .then((resp) => {
      return resp.data.data;
    });

export default {
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  getLatestProducts,
  registerUser,
  signInUser,
  addToCart,
  getCartItems,
  deleteCartItems,
  updateCartQuantity,
  createOrder,
  getMyOrder,
  searchProducts,
  updateOrder,
  addUserAddress,
  getUserAddresses,
};
