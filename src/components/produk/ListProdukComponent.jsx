// import React from "react";

// function ListProdukComponent() {
//     const dummyData = [
//         {
//             id: "1",
//             nama_produk: "Laptop",
//             jenis_produk: "Infra",
//             stok: "122",
//             harga_beli: "20000",
//             harga_jual: "30000",
//             status: "Tersedia",
//         },
//         {
//             id: "2",
//             nama_produk: "HP",
//             jenis_produk: "Infra",
//             stok: "1",
//             harga_beli: "1300.00",
//             harga_jual: "15000000.00",
//             status: "Tersedia",
//         },
//     ];

//     return (
//         <div className="container mt-4">
//             <h2>List Produk</h2>
//             <table className="table table-striped" border="1" cellPadding="10" cellSpacing="0">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Nama Produk</th>
//                         <th>Jenis Produk</th>
//                         <th>Stok</th>
//                         <th>Harga Beli</th>
//                         <th>Harga Jual</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {dummyData.map((item) => (
//                         <tr key={item.id}>
//                             <td>{item.id}</td>
//                             <td>{item.nama_produk}</td>
//                             <td>{item.jenis_produk}</td>
//                             <td>{item.stok}</td>
//                             <td>{item.harga_beli}</td>
//                             <td>{item.harga_jual}</td>
//                             <td>{item.status}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
// export default ListProdukComponent;

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
import { listProduk } from "../../services/ProdukService";
import { Link } from "react-router-dom";

function ListProdukComponent() {
    const [produkData, setProdukData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchProduk();
    }, []);

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
            <Link to="/update-produk" className="btn btn-warning me-2 mb-3">
                Update
            </Link>
            <Link to="/tambah-produk" className="btn btn-danger me-2 mb-3">
                Delete
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
