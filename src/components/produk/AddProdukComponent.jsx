import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addProduk, getProdukById, updateProduk } from "../../services/ProdukService";

function addProdukComponent() {
    const [namaProduk, setNamaProduk] = useState("");
    const [jenisProduk, setJenisProduk] = useState("");
    const [stok, setStok] = useState("");
    const [hargaBeli, sethargaBeli] = useState("");
    const [hargaJual, sethargaJual] = useState("");
    const [status, setStatus] = useState("Tersedia"); // status default
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchProduk = async () => {
                try {
                    const response = await getProdukById(id);
                    const data = response.data;

                    setNamaProduk(data.nama_produk);
                    setJenisProduk(data.jenis_produk);
                    setStok(data.stok);
                    sethargaBeli(data.harga_beli);
                    sethargaJual(data.harga_jual);
                    setStatus(data.status);
                } catch (error) {
                    console.error("Error fetching produk data: ", error);
                    setError("Gagal mengambil data produk.");
                }
            };

            fetchProduk();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        try {
            if (id) {
                const newProduct = {
                    id: id,
                    nama_produk: namaProduk,
                    jenis_produk: jenisProduk,
                    stok: stok,
                    harga_beli: hargaBeli,
                    harga_jual: hargaJual,
                    status: status,
                };

                await updateProduk(newProduct);
                setSuccessMessage("Produk berhasil diubah!");
                setNamaProduk("");
                setJenisProduk("");
                setStok("");
                sethargaBeli("");
                sethargaJual("");
                setStatus("Tersedia");
            } else {
                const newProduct = {
                    nama_produk: namaProduk,
                    jenis_produk: jenisProduk,
                    stok: stok,
                    harga_beli: hargaBeli,
                    harga_jual: hargaJual,
                    status: status,
                };

                await addProduk(newProduct);
                setSuccessMessage("Produk berhasil ditambahkan!");
                setNamaProduk("");
                setJenisProduk("");
                setStok("");
                setHargaBeli("");
                setHargaJual("");
                setStatus("Tersedia");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            setError("gagal menambahkan produk. Silahkan Coba Lagi.");
        }
    };
    // Bagian 1: Awal Komponen, Error/Success Message, dan Form
    return (
        <div className="container mt-4">
            {id ? <h2>Ubah Produk</h2> : <h2>Tambah Produk</h2>}
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
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

                {/* Tombol Submit dan Link Kembali */}
                <button type="submit" className="btn btn-primary">
                    Tambah Produk
                </button>
                <Link to="/list-produk" className="btn btn-secondary ms-2">
                    Kembali ke List Produk
                </Link>
            </form>
        </div>
    );
}

export default addProdukComponent;
