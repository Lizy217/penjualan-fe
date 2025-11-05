import React, { useState } from "react";
import { getProdukById, updateProduk } from "../../services/ProdukService";
import { Link, useNavigate } from "react-router-dom";

function UpdateProdukComponent() {
    const navigate = useNavigate();

    const [cari, setCari] = useState("");
    const [produkDitemukan, setProdukDitemukan] = useState(false);
    const [idProduk, setIdProduk] = useState("");

    const [namaProduk, setNamaProduk] = useState("");
    const [jenisProduk, setJenisProduk] = useState("");
    const [stok, setStok] = useState("");
    const [hargaBeli, sethargaBeli] = useState("");
    const [hargaJual, sethargaJual] = useState("");
    const [status, setStatus] = useState("Tersedia");

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Fungsi untuk mencari produk berdasarkan ID
    const handleCariProduk = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);

        if (!cari.trim()) {
            setError("Masukkan ID produk yang ingin dicari!");
            setLoading(false);
            return;
        }

        try {
            const response = await getProdukById(cari);
            const produk = response.data;

            // Jika produk ditemukan, isi form dengan data produk
            setIdProduk(cari);
            setNamaProduk(produk.nama_produk);
            setJenisProduk(produk.jenis_produk);
            setStok(produk.stok);
            sethargaBeli(produk.harga_beli);
            sethargaJual(produk.harga_jual);
            setStatus(produk.status);
            setProdukDitemukan(true);
            setSuccessMessage(`Produk ditemukan: ${produk.nama_produk}`);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product:", error);
            setError("Produk dengan ID tersebut tidak ditemukan!");
            setProdukDitemukan(false);
            setLoading(false);

            // Reset form
            setNamaProduk("");
            setJenisProduk("");
            setStok("");
            sethargaBeli("");
            sethargaJual("");
            setStatus("Tersedia");
        }
    };

    // Fungsi untuk submit update produk
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            const updatedProduct = {
                nama_produk: namaProduk,
                jenis_produk: jenisProduk,
                stok: stok,
                harga_beli: hargaBeli,
                harga_jual: hargaJual,
                status: status,
            };

            await updateProduk(idProduk, updatedProduct);
            setSuccessMessage("Produk berhasil diupdate!");

            // Redirect ke list produk setelah 2 detik
            setTimeout(() => {
                navigate("/list-produk");
            }, 2000);
        } catch (error) {
            console.error("Error updating product:", error);
            setError("Gagal mengupdate produk. Silahkan coba lagi.");
        }
    };

    // Fungsi untuk reset pencarian
    const handleReset = () => {
        setCari("");
        setProdukDitemukan(false);
        setIdProduk("");
        setNamaProduk("");
        setJenisProduk("");
        setStok("");
        sethargaBeli("");
        sethargaJual("");
        setStatus("Tersedia");
        setError("");
        setSuccessMessage("");
    };

    return (
        <div className="container mt-4">
            <h2>Update Produk</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            {/* Form Pencarian Produk */}
            {!produkDitemukan && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Cari Produk Berdasarkan ID</h5>
                        <form onSubmit={handleCariProduk}>
                            <div className="mb-3">
                                <label htmlFor="cari" className="form-label">
                                    ID Produk
                                </label>
                                <input type="text" className="form-control" id="cari" value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Masukkan ID produk..." disabled={loading} />
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Mencari...
                                    </>
                                ) : (
                                    "Cari Produk"
                                )}
                            </button>
                            <Link to="/list-produk" className="btn btn-secondary ms-2">
                                Kembali ke List Produk
                            </Link>
                        </form>
                    </div>
                </div>
            )}

            {/* Form Update Produk - Hanya muncul jika produk ditemukan */}
            {produkDitemukan && (
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="card-title mb-0">Form Update Produk (ID: {idProduk})</h5>
                            <button type="button" className="btn btn-sm btn-warning" onClick={handleReset}>
                                Cari Produk Lain
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Input Nama Produk */}
                            <div className="mb-3">
                                <label htmlFor="namaProduk" className="form-label">
                                    Nama Produk
                                </label>
                                <input type="text" className="form-control" id="namaProduk" value={namaProduk} onChange={(e) => setNamaProduk(e.target.value)} required />
                            </div>

                            {/* Input Jenis Produk */}
                            <div className="mb-3">
                                <label htmlFor="jenisProduk" className="form-label">
                                    Jenis Produk
                                </label>
                                <input type="text" className="form-control" id="jenisProduk" value={jenisProduk} onChange={(e) => setJenisProduk(e.target.value)} required />
                            </div>

                            {/* Input Stok */}
                            <div className="mb-3">
                                <label htmlFor="stok" className="form-label">
                                    Stok
                                </label>
                                <input type="number" className="form-control" id="stok" value={stok} onChange={(e) => setStok(e.target.value)} required />
                            </div>

                            {/* Input Harga Beli */}
                            <div className="mb-3">
                                <label htmlFor="hargaBeli" className="form-label">
                                    Harga Beli
                                </label>
                                <input type="number" className="form-control" id="hargaBeli" value={hargaBeli} onChange={(e) => sethargaBeli(e.target.value)} required />
                            </div>

                            {/* Input Harga Jual */}
                            <div className="mb-3">
                                <label htmlFor="hargaJual" className="form-label">
                                    Harga Jual
                                </label>
                                <input type="number" className="form-control" id="hargaJual" value={hargaJual} onChange={(e) => sethargaJual(e.target.value)} required />
                            </div>

                            {/* Input Status (Dropdown) */}
                            <div className="mb-3">
                                <label htmlFor="status" className="form-label">
                                    Status
                                </label>
                                <select className="form-select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Tersedia">Tersedia</option>
                                    <option value="Tidak Tersedia">Tidak Tersedia</option>
                                </select>
                            </div>

                            {/* Tombol Submit dan Kembali */}
                            <button type="submit" className="btn btn-success">
                                Update Produk
                            </button>
                            <Link to="/list-produk" className="btn btn-secondary ms-2">
                                Kembali ke List Produk
                            </Link>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateProdukComponent;
