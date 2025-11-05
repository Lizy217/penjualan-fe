import axios from "axios";

const REST_API_BASE_URL = "https://api.roniprsty.com/produk/";

export const listProduk = () => axios.get(REST_API_BASE_URL + "read.php");

export const addProduk = (newProduct) => {
    return axios.post(REST_API_BASE_URL + "create.php", newProduct);
};

// Fungsi untuk mengambil produk berdasarkan ID
export const getProdukById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// Fungsi untuk update produk
export const updateProduk = (id, produk) => {
    return axios.put(`${API_URL}/${id}`, produk);
};
