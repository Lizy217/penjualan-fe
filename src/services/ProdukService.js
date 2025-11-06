import axios from "axios";

const REST_API_BASE_URL = "https://api.roniprsty.com/produk/";

export const listProduk = () => axios.get(REST_API_BASE_URL + "read.php");
export const addProduk = (newProduct) => {
    return axios.post(REST_API_BASE_URL + "create.php", newProduct);
};

// Fungsi untuk mengambil produk berdasarkan ID
export const getProdukById = (idProduct) => {
    return axios.delete(`${REST_API_BASE_URL}detail.php?id=${idProduct}`);
};

// update
export const updateProduk = (newProduct) => {
    return axios.put(REST_API_BASE_URL + "update.php", newProduct);
};

//delete
export const deleteProduk = (idProduct) => {
    return axios.delete(`${REST_API_BASE_URL}delete.php?id=${idProduct}`);
};
