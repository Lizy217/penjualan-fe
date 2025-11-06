// import React, { useState, useEffect } from "react";
// // Import useParams untuk membaca ID dari URL
// import { Link, useNavigate, useParams } from "react-router-dom";

// function UpdateProdukComponent() {
//     const navigate = useNavigate();
//     // 1. Mengambil ID Produk dari URL
//     const { id: idProdukUrl } = useParams();
//     const [idProduk, setIdProduk] = useState(""); // Akan diisi dari URL
//     const [namaProduk, setNamaProduk] = useState("");
//     // Mengubah JenisProduk ke ID Jenis Produk (sesuai algoritma PHP)
//     const [idJenisProduk, setIdJenisProduk] = useState("");
//     // Mengubah Stok ke Stok Produk (sesuai algoritma PHP)
//     const [stokProduk, setStokProduk] = useState("");
//     // Mengubah Harga Beli/Jual ke Harga Produk (asumsi hanya satu field Harga di form PHP)
//     const [hargaProduk, setHargaProduk] = useState("");
//     // Menambahkan Potongan Harga Produk
//     const [potonganHargaProduk, setPotonganHargaProduk] = useState("");

//     const [error, setError] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const [loading, setLoading] = useState(true); // Mulai dengan loading=true

//     useEffect(() => {
//         // Cek jika ID produk dari URL ada
//         if (idProdukUrl) {
//             setIdProduk(idProdukUrl);
//             fetchProdukData(idProdukUrl);
//         } else {
//             setError("ID Produk tidak ditemukan di URL.");
//             setLoading(false);
//         }
//     }, [idProdukUrl]); // Jalankan hanya saat idProdukUrl berubah

//     // Fungsi untuk memuat data produk
//     const fetchProdukData = async (id) => {
//         setLoading(true);
//         setError("");
//         try {
//             const response = await getProdukById(id);
//             const produk = response.data;

//             // Memastikan penamaan field sesuai dengan API Anda (MUNGKIN perlu disesuaikan)
//             setNamaProduk(produk.nama_produk || "");
//             // Asumsi field jenis_produk di API adalah ID Jenis Produk
//             setIdJenisProduk(produk.id_jenis_produk || produk.jenis_produk || "");
//             setStokProduk(produk.stok_produk || produk.stok || "");
//             // Asumsi Harga Produk = Harga Jual (sesuai field harga_produk di PHP)
//             setHargaProduk(produk.harga_produk || produk.harga_jual || "");
//             setPotonganHargaProduk(produk.potongan_harga_produk || 0);

//             setLoading(false);
//         } catch (err) {
//             console.error("Error fetching product:", err);
//             setError("Gagal memuat data produk. Pastikan ID benar dan API berjalan.");
//             setLoading(false);
//         }
//     };

//     // Fungsi untuk submit update produk
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccessMessage("");
//         setLoading(true);

//         try {
//             const updatedProduct = {
//                 id_produk: idProduk,
//                 nama_produk: namaProduk,
//                 id_jenis_produk: idJenisProduk, // Field di API harus disesuaikan
//                 stok_produk: stokProduk, // Field di API harus disesuaikan
//                 harga_produk: hargaProduk, // Field di API harus disesuaikan
//                 potongan_harga_produk: potonganHargaProduk, // Field di API harus disesuaikan
//                 // Hapus field yang tidak ada di form (misalnya harga_beli, status)
//             };

//             await updateProduk(idProduk, updatedProduct);
//             setSuccessMessage("Produk berhasil diupdate!");

//             // Redirect ke list produk setelah 2 detik
//             setTimeout(() => {
//                 navigate("/list-produk");
//             }, 2000);
//         } catch (err) {
//             console.error("Error updating product:", err);
//             setError("Gagal mengupdate produk. Silahkan cek koneksi dan data.");
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="container mt-5 text-center">
//                 <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//                 <p className="mt-2">Memuat data produk...</p>
//             </div>
//         );
//     }

//     if (error && !idProduk) {
//         return (
//             <div className="container mt-4">
//                 <div className="alert alert-danger">Error: {error}</div>
//                 <Link to="/list-produk" className="btn btn-secondary">
//                     Kembali ke List Produk
//                 </Link>
//             </div>
//         );
//     }

//     return (
//         <div className="container mt-4">
//             <h2>Edit Produk (ID: {idProduk})</h2>

//             {error && <div className="alert alert-danger">{error}</div>}
//             {successMessage && <div className="alert alert-success">{successMessage}</div>}

//             <div className="card">
//                 <div className="card-body">
//                     <h5 className="card-title">Form Update Produk</h5>

//                     {/* Menggunakan handleSubmit */}
//                     <form onSubmit={handleSubmit}>
//                         {/* ID Product (read-only) */}
//                         <div className="mb-3">
//                             <label htmlFor="idProduk" className="form-label">
//                                 Id Product
//                             </label>
//                             {/* Diatur agar read-only seperti di algoritma PHP */}
//                             <input type="text" className="form-control" id="idProduk" value={idProduk} readOnly />
//                         </div>

//                         {/* Nama Product */}
//                         <div className="mb-3">
//                             <label htmlFor="namaProduk" className="form-label">
//                                 Nama Product
//                             </label>
//                             <input type="text" className="form-control" id="namaProduk" value={namaProduk} onChange={(e) => setNamaProduk(e.target.value)} required />
//                         </div>

//                         {/* Id Jenis Product */}
//                         <div className="mb-3">
//                             <label htmlFor="idJenisProduk" className="form-label">
//                                 Id Jenis Product
//                             </label>
//                             <input type="text" className="form-control" id="idJenisProduk" value={idJenisProduk} onChange={(e) => setIdJenisProduk(e.target.value)} required />
//                         </div>

//                         {/* Stock Product */}
//                         <div className="mb-3">
//                             <label htmlFor="stokProduk" className="form-label">
//                                 Stock Product
//                             </label>
//                             <input type="number" className="form-control" id="stokProduk" value={stokProduk} onChange={(e) => setStokProduk(e.target.value)} required />
//                         </div>

//                         {/* Harga */}
//                         <div className="mb-3">
//                             <label htmlFor="hargaProduk" className="form-label">
//                                 Harga
//                             </label>
//                             <input type="number" className="form-control" id="hargaProduk" value={hargaProduk} onChange={(e) => setHargaProduk(e.target.value)} required />
//                         </div>

//                         {/* Potongan harga Produk */}
//                         <div className="mb-3">
//                             <label htmlFor="potonganHargaProduk" className="form-label">
//                                 Potongan harga Produk
//                             </label>
//                             <input type="number" className="form-control" id="potonganHargaProduk" value={potonganHargaProduk} onChange={(e) => setPotonganHargaProduk(e.target.value)} />
//                         </div>

//                         {/* Tombol Update dan Kembali */}
//                         <button type="submit" className="btn btn-primary" disabled={loading}>
//                             {loading ? "Updating..." : "Update"}
//                         </button>
//                         <Link to="/list-produk" className="btn btn-secondary ms-2">
//                             Kembali ke List Produk
//                         </Link>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default UpdateProdukComponent;
