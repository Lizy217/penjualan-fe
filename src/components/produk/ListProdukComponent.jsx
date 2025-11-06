// Fungsi untuk memformat angka menjadi Rupiah (di luar komponen atau di dalam file utils)
const formatRupiah = (number) => {
    // Pastikan nilai adalah angka, hapus koma/titik yang tidak perlu jika ada
    let num = parseFloat(number);
    if (isNaN(num)) return number; // return as is if not a number

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, // Opsional: hilangkan ,00
    }).format(num);
};

import React, { useEffect, useState } from "react";
import { listProduk, deleteProduk } from "../../services/ProdukService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function ListProdukComponent() {
    const [produkData, setProdukData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProduk = async () => {
        try {
            const response = await listProduk();
            setProdukData(response.data);
        } catch (error) {
            console.error("Error fetching produk data:", error);
            setError("Gagal mengambil data produk");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProduk();
    }, []);

    const handleDelete = async (idProduct) => {
        Swal.fire({
            title: "yakin ingin menghapus data ini ?",
            text: "Kamu tidak bisa mengulang kembali!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteProduk(idProduct);
                    Swal.fire({
                        title: "Terhapus!",
                        text: "Data telah berhasil dihapus.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });

                    fetchProduk();
                } catch (error) {
                    console.error("Gagal menghapus produk:", error);
                    Swal.fire({
                        title: "Gagal!",
                        text: "Terjadi kesalahan saat menghapus produk.",
                        icon: "error",
                    });
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <h4>Loading...</h4>
            </div>
        );
    }
    return (
        <div className="container mt-4">
            <h2>List Produk</h2>
            {/* penambahan buttotn */}
            <Link to="/tambah-produk" className="btn btn-primary me-2 mb-3">
                Add Produk
            </Link>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-striped" border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Produk</th>
                        <th>Jenis Produk</th>
                        <th>Stok</th>
                        <th>Harga Beli</th>
                        <th>Harga Jual</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {produkData.length > 0 ? (
                        produkData.map((item) => (
                            <tr key={item.id}>
                                <td style={{ textAlign: "left" }}>{item.id}</td>
                                <td style={{ textAlign: "left" }}>{item.nama_produk}</td>
                                <td style={{ textAlign: "left" }}>{item.jenis_produk}</td>
                                <td className="text-">{item.stok}</td>
                                <td className="text-end">{formatRupiah(item.harga_beli)}</td>
                                <td className="text-end">{formatRupiah(item.harga_jual)}</td>
                                <td style={{ textAlign: "left" }}>{item.status}</td>
                                <td>
                                    <Link to={`/update-produk/${item.id}`} className="btn btn-warning me-2 mb-3">
                                        Update
                                    </Link>
                                    <Link>
                                        {" "}
                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colspan="7" className="text-center">
                                Tidak ada produk ditemukan
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListProdukComponent;
