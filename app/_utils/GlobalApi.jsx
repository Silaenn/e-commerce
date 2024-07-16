import Midtrans from "midtrans-client";

const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((resp) => {
    return resp.data.data;
  });

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((resp) => {
    return resp.data.data;
  });

const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((resp) => {
    return resp.data.data;
  });

const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[caregories][name][$in]=" + category + "&populate=*")
    .then((resp) => {
      return resp.data.data;
    });

const searchProducts = (searchTerm) =>
  axiosClient
    .get(
      `/products?filters[$or][0][slug][$containsi]=${searchTerm}&filters[$or][1][caregories][name][$containsi]=${searchTerm}&populate=*`
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
    .get(
      "/user-carts?filters[userId][$eq]=" +
        userId +
        "&populate[products][populate][images][populate][0]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      const cartItemList = data.map((item) => {
        // console.log("Full item:", JSON.stringify(item, null, 2));
        const product = item.attributes.products.data[0].attributes;
        // console.log("Product:", JSON.stringify(product, null, 2));
        // console.log("Images:", JSON.stringify(product.images, null, 2));

        let imageUrl = "";
        if (product.images && product.images.data && product.images.data[0]) {
          imageUrl = product.images.data[0].attributes.url;
          // console.log("Image URL found:", imageUrl);
        } else {
          console.log("No image URL found");
        }

        return {
          name: product.name,
          quantity: item.attributes.quantity,
          amount: item.attributes.amount,
          image: imageUrl,
          actualPrice: product.sellingPrice,
          id: item.id,
          product: item.attributes.products.data[0].id,
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

const createOrder = async (payload, jwt) => {
  try {
    // Persiapkan data untuk Midtrans
    const midtransPayload = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}`,
        gross_amount: payload.data.totalOrderAmount,
      },
      customer_details: {
        first_name: payload.data.username,
        email: payload.data.email,
      },
    };

    // Panggil API route kita
    const midtransResponse = await axios.post(
      "/api/create-midtrans-transaction",
      JSON.stringify(midtransPayload)
    );

    // Simpan order ke backend
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

const getMyOrder = (userId, jwt) =>
  axiosClient
    .get(
      "orders?filters[userId][$eq]=" +
        userId +
        "&[populate][orderitemList][populate][product][populate][images]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const response = resp.data.data;
      const orderList = response.map((item) => ({
        id: item.id,
        totalOrderAmount: item.attributes.totalOrderAmount,
        paymentId: item.attributes.paymentId,
        orderItemList: item.attributes.orderitemList,
        createdAt: item.attributes.createdAt,
        status: item.attributes.Status,
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

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  signInUser,
  addToCart,
  getCartItems,
  deleteCartItems,
  createOrder,
  getMyOrder,
  searchProducts,
  updateOrder,
};
